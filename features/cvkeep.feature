Feature: Can user find a cv on cvkeep
    User Wants to do a search on cvkeep

    Scenario: User can do a search
    Given I am on the cvkeep webpage
    When I search for "Fabio"
    Then the first profile should start with "Fabio"