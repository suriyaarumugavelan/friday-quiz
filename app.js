(function () {
  "use strict";

  const STORAGE_KEY = "birthday-quiz-progress";
  const { questions, nudges, themeNudges, acceptedThemes } = window.QUIZ;
  const { message, signature, itinerary } = window.BIRTHDAY;
  const app = document.getElementById("app");

  function loadState() {
    const fresh = { started: false, answered: 0, unlocked: false };
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!saved || !Number.isInteger(saved.answered)) return fresh;
      return {
        started: Boolean(saved.started),
        answered: Math.min(Math.max(saved.answered, 0), questions.length),
        unlocked: Boolean(saved.unlocked),
      };
    } catch {
      return fresh;
    }
  }

  const state = loadState();

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Private browsing can block storage; the quiz still works without it.
    }
  }

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function heading(text) {
    const h2 = el("h2", "", text);
    h2.tabIndex = -1;
    return h2;
  }

  function show(...nodes) {
    app.replaceChildren(...nodes);
    window.scrollTo(0, 0);
    const h2 = app.querySelector("h2");
    if (h2) h2.focus({ preventScroll: true });
  }

  function tiles(newestIndex) {
    const list = el("ul", "tiles");
    list.setAttribute("aria-label", `${state.answered} of ${questions.length} letters earned`);
    questions.forEach((question, index) => {
      const earned = index < state.answered;
      const classes = ["tile", earned && "earned", index === newestIndex && "new"];
      list.append(el("li", classes.filter(Boolean).join(" "), earned ? question.letter : ""));
    });
    return list;
  }

  function renderIntro() {
    const start = el("button", "primary", "Begin the investigation");
    start.type = "button";
    start.addEventListener("click", () => {
      state.started = true;
      saveState();
      render();
    });
    show(
      el("p", "kicker", "Exclusive"),
      heading("Birthday plans remain a mystery"),
      el("p", "", "Sources say today has a secret theme. Answer 10 questions about yourself, and each correct answer earns one letter."),
      el("p", "", "Unscramble the letters to reveal the theme and unlock your day."),
      start
    );
  }

  function renderQuestion() {
    const index = state.answered;
    const question = questions[index];
    const feedback = el("p", "feedback");
    feedback.setAttribute("aria-live", "polite");
    const options = el("div", "options");
    const next = el("button", "primary", index === questions.length - 1 ? "See your letters" : "Next question");
    next.type = "button";
    next.hidden = true;
    let wrongCount = 0;

    const tileRow = tiles();

    question.options.forEach((label, optionIndex) => {
      const option = el("button", "option", label);
      option.type = "button";
      option.addEventListener("click", () => {
        if (optionIndex !== question.correct) {
          option.classList.add("wrong");
          option.disabled = true;
          feedback.className = "feedback bad";
          feedback.textContent = nudges[(index + wrongCount) % nudges.length];
          wrongCount += 1;
          return;
        }
        option.classList.add("right");
        options.querySelectorAll("button").forEach((button) => { button.disabled = true; });
        feedback.className = "feedback good";
        feedback.textContent = question.praise;
        state.answered = index + 1;
        saveState();
        tileRow.replaceWith(tiles(index));
        next.hidden = false;
        next.focus({ preventScroll: true });
      });
      options.append(option);
    });

    next.addEventListener("click", render);

    show(
      tileRow,
      el("p", "kicker", `Question ${index + 1} of ${questions.length}`),
      heading(question.prompt),
      options,
      feedback,
      next
    );
  }

  function renderGuess() {
    const form = el("form");
    const input = el("input", "guess");
    input.type = "text";
    input.placeholder = "Today's theme";
    input.setAttribute("aria-label", "Today's theme");
    input.autocomplete = "off";
    input.setAttribute("autocapitalize", "characters");
    input.setAttribute("autocorrect", "off");
    input.spellcheck = false;
    const submit = el("button", "primary", "Reveal my day");
    submit.type = "submit";
    const feedback = el("p", "feedback");
    feedback.setAttribute("aria-live", "polite");
    let wrongCount = 0;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const guess = input.value.toUpperCase().replace(/[^A-Z]/g, "");
      if (!guess) return;
      if (acceptedThemes.includes(guess)) {
        state.unlocked = true;
        saveState();
        render();
        return;
      }
      feedback.className = "feedback bad";
      feedback.textContent = themeNudges[wrongCount % themeNudges.length];
      wrongCount += 1;
      input.select();
    });

    form.append(input, feedback, submit);
    show(
      tiles(),
      el("p", "kicker", "The final question"),
      heading("What is today's theme?"),
      el("p", "", "Unscramble your letters."),
      form
    );
  }

  function renderReveal() {
    const letter = el("section", "letter");
    message.forEach((paragraph) => letter.append(el("p", "", paragraph)));
    letter.append(el("p", "signature", signature));

    const list = el("ol", "itinerary");
    itinerary.forEach((item) => {
      const row = el("li");
      const body = el("div");
      body.append(el("strong", "", item.title));
      if (item.detail) body.append(el("span", "detail", item.detail));
      row.append(el("span", "time", item.time), body);
      list.append(row);
    });

    show(
      el("p", "kicker", "Breaking news"),
      heading("Happy Birthday, Snigdhu!"),
      letter,
      el("p", "kicker", "Today's itinerary"),
      list
    );
  }

  function render() {
    if (state.unlocked) renderReveal();
    else if (!state.started) renderIntro();
    else if (state.answered < questions.length) renderQuestion();
    else renderGuess();
  }

  render();
})();
