export const UkrainCard = ({ eachObj, date, baka }) => {
  console.log("baka is ", baka);
  if (eachObj.urlToImage === null) {
    return (
      <div
        class="carousel-item active"
        onClick={() => {
          window.location.assign(eachObj.url);
        }}
      >
        <img
          src="https://www.tagesspiegel.de/kultur/images/fdd24f78-8125-47ae-b02e-3b992a2a95d8jpg/alternates/BASE_16_9_W1400/fdd24f78-8125-47ae-b02e-3b992a2a95d8jpg.jpeg"
          class="d-block w-100 h-75"
          alt="..."
        />
        <div class="carousel-caption d-flex d-md-block">
          <h5 className="uCardText">Date : {date.slice(0, 10)}</h5>
          <p className="uCardText">Description : {eachObj.description}</p>
        </div>
      </div>
    );
  }
  return (
    <div
      class={`carousel-item`}
      onClick={() => {
        window.location.assign(eachObj.url);
      }}
    >
      <img src={eachObj.urlToImage} class="d-block w-100 h-75" alt="..." />
      <div class="carousel-caption d-block ukraineCardText d-md-block">
        <h5 className="uCardText">Date : {date.slice(0, 10)}</h5>
        <p className="uCardText">Description : {eachObj.description}</p>
      </div>
    </div>
  );
};

/*  <div class="carousel-item active">
          <img
            src="http://images.wsj.net/im-832893?width=1280&height=720"
            class="d-block w-100 h-75"
            alt="..."
          />
          <div class="carousel-caption d-none d-md-block">
            <h5>First slide label</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </div>
        </div>
        <div class="carousel-item">
          <img
            src="https://www.aljazeera.com/wp-content/uploads/2023/08/2022-10-14T114217Z_732760502_RC2X0X9B5YY2_RTRMADP_3_UKRAINE-CRISIS-NUCLEAR-ZAPORIZHZHIA-1691576240.jpg?resize=1920%2C1440"
            class="d-block w-100 h-75"
            alt="..."
          />
          <div class="carousel-caption d-none d-md-block">
            <h5>Second slide label</h5>
            <p>Some representative placeholder content for the second slide.</p>
          </div>
        </div>
        <div class="carousel-item">
          <img
            src="https://www.aljazeera.com/wp-content/uploads/2023/08/2023-08-09T224712Z_1167309765_RC2JK2ADKAY5_RTRMADP_3_UKRAINE-CRISIS-ATTACK-ZAPORIZHZHIA-1691648566.jpg?resize=1920%2C1440"
            class="d-block w-100 h-75"
            alt="..."
          />
          <div class="carousel-caption d-none d-md-block">
            <h5>Third slide label</h5>
            <p>Some representative placeholder content for the third slide.</p>
          </div>
        </div>*/

// <div id="carouselExampleCaptions" class="carousel slide">
//   <div class="carousel-indicators">
//     <button
//       type="button"
//       data-bs-target="#carouselExampleCaptions"
//       data-bs-slide-to="0"
//       class="active"
//       aria-current="true"
//       aria-label="Slide 1"
//     ></button>
//     <button
//       type="button"
//       data-bs-target="#carouselExampleCaptions"
//       data-bs-slide-to="1"
//       aria-label="Slide 2"
//     ></button>
//     <button
//       type="button"
//       data-bs-target="#carouselExampleCaptions"
//       data-bs-slide-to="2"
//       aria-label="Slide 3"
//     ></button>
//   </div>
//   <div class="carousel-inner"></div>
//   <button
//     class="carousel-control-prev"
//     type="button"
//     data-bs-target="#carouselExampleCaptions"
//     data-bs-slide="prev"
//   >
//     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
//     <span class="visually-hidden">Previous</span>
//   </button>
//   <button
//     class="carousel-control-next"
//     type="button"
//     data-bs-target="#carouselExampleCaptions"
//     data-bs-slide="next"
//   >
//     <span class="carousel-control-next-icon" aria-hidden="true"></span>
//     <span class="visually-hidden">Next</span>
//   </button>
// </div>
