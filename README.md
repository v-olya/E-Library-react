# Úkol
Vytvořte jednoduché grafické rozhraní k aplikaci pro správu knihovny nad daným API

==============================

* Získání tokenu:
    POST /auth/token/, data: {"username": ..., "password": ...} - získání přihlašovacího tokenu

* Autorizace reqestů:
    hlavička: 'Authorization: Token <token>'
    
* Čtení:
    /api/{authors, books}/ - seznam položek
            ?o=first_name - ... uspořádaný podle atributu first_name
            ?_search=abcd - ... vyhledávání substringu 'abcd'
    /api/{authors, books}/<id>/ - detail položky

* Vytváření + editace
    POST /api/{authors, books}/, data - vytvoření položky
    PUT /api/{authors, books}/<id>/, data - změna položky

* Mazání
    DELETE /api/{authors, books}/<id>/ - smazání položky

## Požadavky:
============

    Vytvořte jednoduché grafické rozhraní, které umožní:

        - zobrazit seznam položek (tabulka)
        - zobrazit detail položky (u autora by měl být seznam jeho knih)
        - přidat / editovat / smazat položku
        - přihlášení / odhlášení uživatele

        ! myslete na zabezpečení
