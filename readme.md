# Flashcard App

This is a simple flashcard application that allows users to select a class and go through a series of flashcards related to SIADS 593: Milestone I Oral Exam. The app is built using HTML, CSS, and JavaScript, and it fetches questions from a JSON file.

## Features

- Select a class to view related flashcards.
- Flip flashcards to see the answer.
- Mark flashcards as known or unknown.
- Track progress through a progress bar.

## Project Structure

- `index.html`: The main HTML file that structures the web page.
- `styles.css`: Contains the styling for the application.
- `app.js`: The main JavaScript file that handles the logic for loading and displaying flashcards.
- `questions.json`: A JSON file containing the flashcard data. **Note:** You will need to edit the answers in this file yourself.

## Getting Started

### Prerequisites

- Python 3.x installed on your machine.

### Running the Application

1. **Clone the repository** or download the project files to your local machine.

2. **Navigate to the project directory** in your terminal or command prompt.

3. **Start a local server** using Python's `http.server` module. Run the following command:

   ```bash
   python -m http.server
   ```

   This will start a local server at `http://localhost:8000`.

4. **Open your web browser** and go to `http://localhost:8000` to view the application.

### Usage

- On the homepage, select a class to start viewing flashcards.
- Use the "Show Answer" button to flip the card and see the answer.
- Use the "I Know This" or "I Don't Know" buttons to mark your progress.
- Track your progress with the progress bar at the bottom of the flashcard section.
- Use the "Back to Classes" button to return to the class selection screen.

## Editing Flashcard Answers

- Open the `questions.json` file in a text editor.
- Locate the `"answer": "REPLACE_WITH_ANSWER"` fields.
- Replace `"REPLACE_WITH_ANSWER"` with the correct answers for each question.

## Code Overview

- **HTML**: The structure of the app is defined in `index.html`.
- **CSS**: The styles are defined in `styles.css` to make the app visually appealing.
- **JavaScript**: The logic for loading flashcards, handling user interactions, and updating the UI is in `app.js`.

## Contributing

If you wish to contribute to this project, feel free to fork the repository and submit a pull request.

## License

This project is open-source and available under the MIT License.
