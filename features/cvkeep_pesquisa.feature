Feature:    O usuário pode pesquisar por um cv
    Usuário quer pesquisar pelo curriculo de alguem chamado fábio

    Scenario: Usuário pode pesquisar
    Given Eu estou na pagina do CVkeep
    When Eu pesquiso por "Fabio"
    Then O primeiro perfil deve ter um nome que começa com "Fabio"