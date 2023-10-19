const container = document.querySelector(".container");
const totalInfoText = document.querySelector(".infoText");
const count = document.getElementById("count");
const totalPrice = document.getElementById("totalPrice");
const movieSelectBox = document.getElementById("movie");
const seats = document.querySelectorAll(".seat:not(.reserved)");

const readFromDatabase = () => {
  const dbSelectedMovie = JSON.parse(localStorage.getItem("selectedMovie"));
  if (dbSelectedMovie) {
    movieSelectBox.selectedIndex = dbSelectedMovie;
  }

  const dbSelectedSeats = JSON.parse(localStorage.getItem("seatIndex"));
  if (dbSelectedSeats !== null && dbSelectedSeats.length > 0) {
    totalInfoText.classList.add("open");
    seats.forEach((seat, index) => {
      if (dbSelectedSeats.includes(index)) {
        seat.classList.add("selected");
      }
    });
  }
};

const saveToDatabase = (seatsindexs) => {
  localStorage.setItem("seatIndex", JSON.stringify(seatsindexs));
  localStorage.setItem(
    "selectedMovie",
    JSON.stringify(movieSelectBox.selectedIndex)
  );
};

readFromDatabase();

const calcTotal = () => {
  const selectedSeats = container.querySelectorAll(".seat.selected");
  const allSelectedSeatsArray = [];

  selectedSeats.forEach((selectedSeat) => {
    allSelectedSeatsArray.push(selectedSeat);
  });

  const allSeatsArray = [];

  seats.forEach((seat) => {
    allSeatsArray.push(seat);
  });

  let selectedSeatsIndexs = allSelectedSeatsArray.map((selectedSeat) => {
    return allSeatsArray.indexOf(selectedSeat);
  });

  const selectedSeatsCount =
    container.querySelectorAll(".seat.selected").length;

  if (selectedSeatsCount > 0) {
    totalInfoText.classList.add("open");
  } else {
    totalInfoText.classList.remove("open");
  }
  count.innerText = selectedSeatsCount;

  totalPrice.innerText = selectedSeatsCount * movieSelectBox.value;
  saveToDatabase(selectedSeatsIndexs);
};

calcTotal();

container.addEventListener("click", (mouseEvent) => {
  const clickSeat = mouseEvent.target.offsetParent;
  if (
    clickSeat.classList.contains("seat") &&
    !clickSeat.classList.contains("reserved")
  ) {
    clickSeat.classList.toggle("selected");
  }
  calcTotal();
});

movieSelectBox.addEventListener("change", () => {
  calcTotal();
});
