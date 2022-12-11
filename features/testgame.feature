@wip

Feature: 3cups game testing

  Scenario Outline: I am switching difficuilty level

    Given I am on the "https://icm213.github.io/3-cups-game/" page
    When I am chosing <dfLevel>
    # Then I should see a flash message saying <message>

    Examples:
      | dfLevel  |  |  |
      | "easy"   |  |  |
      | "normal" |  |  |
      | "hard"   |  |  |
      | "fluke"  |  |  |