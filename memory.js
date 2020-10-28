let match = {
  // (A) PROPERTIES
  // (A1) HTML ELEMENTS
  hWrap : 0, // HTML game wrapper
  hCards : -1, // HTML cards
  // (A2) GAME SETTINGS
  sets : 2, // Số cặp thẻ cần match
  hint : 1000, // Thời gian hiển thị các thẻ ko giống nhau
  // (A3) FLAGS
  loaded : 0, // Total number of assets loaded
  moves : 0, // Tổng số nước đi
  last : -1, // Thẻ hiện tại đang mở
  grid : -1, // Current play grid
  alike : -1, // 2 thẻ được chọn giống nhau
  locked : -1, //2 thẻ được chọn không giống

  // (B) PRELOAD
  preload : function () {
    // (B1) GET HTML GAME WRAPPER
    match.hWrap = document.getElementById("match-game");

    // (B2) PRELOAD IMAGES
    for (let i=0; i<=match.sets; i++) {
      let img = document.createElement("img");
      img.onload = function(){
        match.loaded++;
        console.log(match.loaded);
        if (match.loaded === match.sets+1) { match.init(); }
      };
      img.src = "smiley-"+i+".png";
    }
  },
  
  // (C) INIT GAME
  init : function () {
    // (C1) RESET
    if (match.locked !== -1) {
      clearTimeout(match.locked);
      match.locked = -1;
    }
    match.hCards = [];
    match.grid = [];
    match.alike = [];
    match.moves = 0;
    match.last = -1;
    match.locked = -1;
    match.hWrap.innerHTML = "";

    // (C2) Random các thẻ
    // Credits : https://gomakethings.com/how-to-shuffle-an-array-with-vanilla-js/
    let current = match.sets * 2, temp, random;
    for (let i=1; i<=match.sets; i++) {
      match.grid.push(i);
      match.grid.push(i);
    }
    while (0 !== current) {
      random = Math.floor(Math.random() * current);
      current -= 1;
      temp = match.grid[current];
      match.grid[current] = match.grid[random];
      match.grid[random] = temp;
    }
    
    // (C3) Tạo các thẻ
    for (let i=0; i<match.sets * 2; i++) {
      let card = document.createElement("div");
      card.className = "match-card";
      card.innerHTML = `<img src='smiley-0.png' />`;
      card.dataset.idx = i;
      card.onclick = match.open;
      match.hWrap.appendChild(card);
      match.hCards.push(card);
    }
  },
  
  // (D) Mở các thẻ
  open : function () { if (match.locked === -1) {
    // (D1) Mở các thẻ đã chọn
    match.moves++;
    let idx = this.dataset.idx;
    this.innerHTML = `<img src='smiley-${match.grid[idx]}.png'/>`;
    this.classList.add("open");
    
    // (D2)
    if (match.last === -1) { match.last = idx; }
    
    else {
      // (D3) Ghép đúng các thẻ và win
      if (match.grid[idx] === match.grid[match.last]) {
        match.alike.push(match.last);
        match.alike.push(idx);
        match.hCards[match.last].classList.remove("open");
        match.hCards[idx].classList.remove("open");
        match.hCards[match.last].classList.add("right");
        match.hCards[idx].classList.add("right");
        match.last = -1;
        if (match.alike.length === match.sets * 2) {
          setTimeout(function() {
            alert("YOU WIN! TOTAL MOVES " + match.moves);
          },200);

        }
      }

      // (D4)Mở 2 thẻ không giống nhau thì đóng lại
      else {
        match.hCards[match.last].classList.add("wrong");
        match.hCards[idx].classList.add("wrong");
        match.locked = setTimeout(function(){
          match.close(idx, match.last);
        }, match.hint);
      }
    }
  }},

  // (E) Đóng các thẻ mà ko match với nhau
  close : function (a, b) {
    a = match.hCards[a];
    b = match.hCards[b];
    a.classList.remove("wrong");
    b.classList.remove("wrong");
    a.classList.remove("open");
    b.classList.remove("open");
    a.innerHTML = `<img src='smiley-0.png'/>`;
    b.innerHTML = `<img src='smiley-0.png'/>`;
    a.onclick = match.open;
    b.onclick = match.open;
    match.locked = -1;
    match.last = -1;
  }
};

// (F) INIT GAME
window.addEventListener("DOMContentLoaded", match.preload);