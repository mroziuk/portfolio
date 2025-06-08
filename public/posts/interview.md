---
name: "Interview"
date: "2025-02-11"
category: "post"
tags: ["CS"]
---

Podczas szukania pracy miałem okazję odbyć wiele rozmów o pracę, jednak jedna wyjątkowo zapadła mi w pamięć. W technicznej części dostałem jedno zadanie do zrobienia, 20 linijek kodu do przeanalizowania. Udało mi się znaleźć sporo błędów oraz możliwych usprawnień, lecz byłem zaskoczony ile "pułapek" udało się rekruterowi schować w jednej funkcji.

Poniżej przedstawiam to co udało mi się odtworzyć po rozmowie. Polecam sprawdzić, co będziesz w stanie znaleźć.

```cs
public Void Process()
{
	File
		.AppendText("log.txt")
		.WriteLineAsync("starting...");
	var stringData = new HttpClient()
		.GetStringAsync("https://jsonplaceholder.typicode.com/posts")
		.Result()
	var data = JsonConvert.DeserializeObject<dynamic[]>(stringData);
	File
		.AppendText("log.txt")
		.WriteLineAsync("recived" + data.Length + "records");
	var connection = new SqlConnection(@"server=localhost (...) ");
	connection.Open();
	var count = 0;
	foreach(var rep in data)
	{
		if(rep.title.Value.Contains("est renum"))
		{
			continue;
		}

		Task.Factory.StartNew(() => {
			new SqlCommand(
			$"INSERT INTO R (id, title) values({rep.id.Value}, {rep.title.Value})", connection)
				.ExecuteNonQuery();
			count++;
			File
				.AppendText("log.txt")
				.WriteLineAsync("Saved record no" + count);
		})
	}
}
```

Zacznijmy analizować kod od początku. `File.AppendText("log.txt")` pojawia się w metodzie wiele razy, dobrym pomysłem byłoby przenieść to do funkcji lub użyć interfejsu ILogger, dzięki czemu możemy mieć spójne logowanie dla całej aplikacji.

W kolejnym kroku tworzymy obiekt `HttpClient`. Rzuca się w oczy, że lepiej byłoby przenieść go poza funkcję, np. jako singleton. Podczas rozmowy udało mi się zwrócić na to uwagę, jednak nie znałem drugiej zalety. Jeśli używamy szyfrowanego protokołu `https` podczas pierwszego połączenia nasz klient wysyła "handshake" oraz sprawdza certyfikat SSL. Kod który widać powyżej wykonuje te operacje nie potrzebnie przy każdym wywołaniu funkcji.

Kod nie ma żadnej obsługi wyjątków, mimo że jest wiele miejsc, w których może pojawić się nieoczekiwany problem: pobieranie danych, deserializacja, odczyt `rep.id` oraz `rep.title`, zapytania SQL. Wyjątki możemy łapać łącznie dla całej metody lub podzielić na mniejsze bloki `try catch`.

Otwieramy `SQL connection` i nie ma nigdzie wykonanego zamykania. C# jest językiem, w którym za sprzątanie pamięci odpowiada GarbageCollector. Trzeba jednak pamiętać, że GC potrafi posprzątać jedynie zasoby zależne od środowiska .NET. O wszystkie pozostałe, w tym połączenia do bazy danych, musimy zadbać sami. W tym celu wystarczy wykonać `.Dispose()` lub użyć `using`.
```csharp
using (var client = new HttpClient())
using (var connection = new SqlConnection(connectionString))
using (var writer = File.AppendText("log.txt"))
```

Bardzo ważna rzecz zawsze gdy mamy do czynienia z kodem SQL bezpośrednio w metodach to zabezpieczenie się przed atakiem sql injection. Łatwo zauważyć, że w powyższym kodzie brakuje tego. Najprostsze rozwiązanie to użycie parametrów.
```csharp
var command = new SqlCommand("INSERT INTO R (id, title) VALUES (@id, @title)", connection);
command.Parameters.AddWithValue("@id", (int)rep.id.Value);
command.Parameters.AddWithValue("@title", (string)rep.title.Value);
```

Zastanówmy się nad ostatnią częścią kodu, służącą do zapisu danych do bazy. `Task.Factory.StartNew` uruchamia równoległy task, ale nie ma nad nim kontroli (brak `await`, brak synchronizacji). Dodatkowo wspólne użycie `SqlConnection` i `count` w wielu wątkach będzie powodować `race condition`. (Nie znalazłem dobrego tłumaczenia). Zmienna `count` może zostać zwiększona przed zapisaniem do pliku. Lepszym rozwiązaniem będzie zastosowanie `await`
```cs
await command.ExecuteNonQueryAsync();
count++;
await logWriter.WriteLineAsync($"Saved record no {count}");
```
Po tej zmianie zostało nam ostatnia rzecz do zmiany. Jeśli używamy `await` zmieńmy deklarację metody z `public Void Process()` na `public async Task Process()`.