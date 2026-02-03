export default function DialougeScreen(script) {

  return {
    currentIndex: 0,
    script,

    enter() {
      this.currentIndex = 0;
      this.showCurrent();
    },

    showCurrent() {
      if (this.currentIndex >= this.script.length) {
        console.log("Dialouge finished");
        return;
      }
      const entry = this.script[this.currentIndex];
      this.render(entry);
    },

    next() {
      this.currentIndex++;
      this.showCurrent();
    },

    render(entry){
      const app  = document.getElementById("app");
      app.innerHTML = `
        <div class="dialogue-container">
          <div class="character left">
            <img src="${entry.leftChar.img}" alt="${entry.leftChar.name}">
          </div>
          <div class="dialogue-box">
            <p class="speaker">${entry.speaker}</p>
            <p class="text">${entry.text}</p>
            <button id="next-btn">Next</button>
          </div>
          <div class="character right">
            <img src="${entry.rightChar.img}" alt="${entry.rightChar.name}">
          </div>
        </div>
      `;

      document.getElementById("next-btn").onclick = () => this.next();
    }
  };
}