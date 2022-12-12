@wip

Feature: 3cups game win or lost testing

  Background: I started game
    Given I am on the "https://icm213.github.io/3-cups-game/" page
    Given I am chosing "fluke"

  Scenario Outline: Running game multiple times
    Given The game is starting <number> time
    When I clicked on cup one
    Then First selected cup should not be able to reselect
    Then I should win or play further

    Examples:
      | number |
      | 1      |
      | 2      |
      | 3      |
      | 4      |
      | 5      |
      | 6      |
