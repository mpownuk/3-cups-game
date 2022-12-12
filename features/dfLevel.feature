@wip

Feature: 3cups game dfLevel testing

  Background: Open site game
    Given I am on the "https://icm213.github.io/3-cups-game/" page

  Scenario Outline: I am able to play game
    Given I am chosing <dfLevel>
    When I click start game button
    Then The game should be start

    Examples:
      | dfLevel  |
      | "easy"   |
      | "normal" |
      | "hard"   |
      | "fluke"  |

