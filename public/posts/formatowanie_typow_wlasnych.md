---
name: "Fancy ToString"
date: "2025-03-22"
category: "post"
tags: ["CS", "NET"]
---

# Niestandardowe formatowanie własnych typów w C#

Pracując z typem `DateTime` w języku C# możemy łatwo zdefiniować jego reprezentację tekstową, korzystając z metody `ToString` z określonym formatem. Przykład takiego zapisu wygląda następująco:

```csharp
Console.WriteLine(date.ToString("yyyy-MM-dd HH:mm:ss"));
```

Wbudowany mechanizm formatowania w .NET jest bardzo wygodny i elastyczny, dlatego warto zastanowić się, jak można osiągnąć podobny efekt dla własnych klas. Przejdźmy więc do konkretnego przykładu, w którym wykorzystamy klasę `Person`.

```csharp
class Person
{
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public int Age { get; set; }
}
```

Dzięki przeciążaniu metody `ToString` w C# jesteśmy w stanie nadać klasie niestandardową reprezentację tekstową. Możemy rozpocząć od domyślnego formatu, który wykorzystuje interpolację tekstu:

```csharp
public override string ToString()
{
    return ToString("{FirstName} {LastName} is {Age} years old", CultureInfo.CurrentCulture);
}
```

Jeśli potrzebujemy kilku predefiniowanych formatów, możemy zaimplementować ich obsługę za pomocą instrukcji `switch`, co daje nam pełną kontrolę nad możliwymi wynikami i eliminuje ryzyko niepożądanych podmian.

```csharp
public string ToString(string? format, IFormatProvider? formatProvider = null)
{
    format ??= "F";
    return format switch
    {
        "F" or "full" => $"{FirstName} {LastName} is {Position} at {Company}",
        "N" or "name" => $"{FirstName} {LastName}",
        "M" or "mail" => $"{FirstName}.{LastName}@{Company}.com",
        _ => throw new FormatException($"Invalid format '{format}'")
    };
}
```

Takie rozwiązanie sprawdza się bardzo dobrze, gdy chcemy ograniczyć użytkownika do wybranych formatów, nad którymi mamy pełną kontrolę. Jeśli jednak zależy nam na większej elastyczności i chcemy dać użytkownikowi możliwość samodzielnego komponowania wzorca, możemy przejść do nieco bardziej dynamicznego podejścia, opartego na tokenach.

W tym celu można przygotować słownik tokenów i wykorzystać wyrażenie regularne do zamiany ich na odpowiednie wartości.

```csharp
public string ToString(string? format, IFormatProvider? formatProvider = null)
{
    var tokens = new Dictionary<string, string>
    {
        { "FF", FirstName },
        { "F", FirstName[..1] },
        { "LL", LastName },
        { "L", LastName[..1] },
        { "P", Position },
        { "C", Company }
    };

    return Regex.Replace(format, @"FF|F|LL|L|P|C", match => tokens[match.Value]);
}
```

Dzięki temu możliwe jest wykorzystanie własnego formatu w prosty sposób:

```csharp
var employee = new Employee
{
    FirstName = "Jane",
    LastName = "Smith",
    Position = "Software Engineer",
    Company = "TechCorp"
};

Console.WriteLine(employee.ToString("FF LL working at C")); // Jane Smith working at TechCorp
Console.WriteLine(employee.ToString("FF L, P")); // Jane S, Software Engineer
Console.WriteLine(employee.ToString("F L.")); // J S.
```

Niestety, takie podejście ma też swoje ograniczenia. Tokeny mogą wystąpić przypadkiem w treści, która nie była przeznaczona do formatowania. Przykładowo:

```csharp
employee.ToString("F. LL. Forced to work at Company C")
```

W tym przypadku niektóre części zostaną błędnie potraktowane jako znaczniki formatowania, mimo że były tylko fragmentem tekstu. Żeby temu zapobiec, wystarczy zmodyfikować wyrażenie regularne tak, aby tokeny były ujęte w nawiasy klamrowe:

```csharp
Regex.Replace(format, @"\{(FF|F|LL|L|P|C)\}", match => tokens[match.Groups[1].Value]);
```

Dzięki temu format będzie bardziej jednoznaczny, a przypadkowe wystąpienia liter nie zostaną omyłkowo zastąpione.

Jeśli chcemy pójść o krok dalej, możemy całkowicie zautomatyzować formatowanie, wykorzystując refleksję. Wystarczy utworzyć klasę bazową, która implementuje interfejs `IFormattable`, i która będzie dynamicznie podmieniać tokeny odpowiadające nazwom właściwości:

```csharp
public abstract class Printable : IFormattable
{
    public string ToString(string? format, IFormatProvider? formatProvider = null)
    {
        return string.IsNullOrWhiteSpace(format)
            ? GetType().Name
            : GetType().GetProperties()
                .Aggregate(format, (current, prop) =>
                    current.Replace($"{{{prop.Name}}}", prop.GetValue(this)?.ToString() ?? ""));
    }

    public string ToString(string? format) => ToString(format, CultureInfo.CurrentCulture);
}
```

Dzięki takiemu rozwiązaniu użytkownik może wpisać dowolny format, w którym używa nazw właściwości w nawiasach klamrowych. Klasa automatycznie je rozpozna i podstawia odpowiednie wartości bez konieczności ręcznego zarządzania słownikiem tokenów.

W ten sposób możemy łatwo przenieść ideę formatowania znaną z wbudowanych typów takich jak `DateTime` do własnych klas, zapewniając zarówno prostotę, jak i elastyczność. Początkowe podejście z predefiniowanymi formatami daje dużą kontrolę i bezpieczeństwo, ale ogranicza użytkownika. Wersja z tokenami zwiększa swobodę kosztem ryzyka błędnej podmiany. Wprowadzenie nawiasów klamrowych rozwiązuje ten problem, a pełna automatyzacja z wykorzystaniem refleksji pozwala na eleganckie i uniwersalne formatowanie dowolnych danych w aplikacji.
