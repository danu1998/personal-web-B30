//array untuk menampung nilai object
let blogs = [];

function addBlog(e) {
  e.preventDefault();

  //membuat variable yang memanggil id input
  let title = document.getElementById("input-blog-title").value;
  let content = document.getElementById("input-blog-content").value;
  let image = document.getElementById("input-blog-image").files;

  // mengkonversi gambar
  image = URL.createObjectURL(image[0]);

  // mencetak ke dalam object
  let blogData = {
    title: title,
    content: content,
    image: image,
    author: "Danu Prakoso",
    createdDate: new Date(),
  };

  // mengirim object ke dalam console / penampungan array object
  blogs.push(blogData);
  console.log(blogs);

  // perulangan saat nilai dikirimkan ke console / array object
  for (i = 0; i < blogs.length; i++) {
    console.log(blogs[i]);
  }

  // memanggil fungsi renderBlog
  renderBlog();
}

// Function renderBlog untuk mengirim data ke addBlog
function renderBlog() {
  let contentContainer = document.getElementById("contents"); //Mengambil id contents
  contentContainer.innerHTML = ""; //mengosongkan content default saat proses cetak
  //looping untuk mencetak isi dari form inputnya
  for (let i = 0; i < blogs.length; i++) {
    contentContainer.innerHTML += ` <div class="blog-list-item">
          <div class="blog-image">
            <img src="${blogs[i].image}" alt="" />
          </div>
          <div class="blog-content">
            <div class="btn-group">
              <button class="btn-edit">Edit Post</button>
              <button class="btn-post">Post Blog</button>
            </div>
            <h1>
              <a href="blog-detail.html" target="_blank"
                >${blogs[i].title}</a
              >
            </h1>
            <div class="detail-blog-content">
              ${getFullTime(blogs[i].createdDate)} | Ichsan Emrald Alamsyah
            </div>
            <p>
              ${blogs[i].content}
            </p>
             <div
              style="
                text-align: right;
                margin-top: 30px;
                color: #777777;
                font-size: 14px;
                font-weight: 500;
              "
            >
              <span>${getDistanceTime(blogs[i].createdDate)}</span>
            </div>
          </div>
        </div>
        
        `;
  }
}

// menampung nilai untuk index pada bulan
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// fungsi untuk mengubah format pada tanggal, bulan, dan tahun
function getFullTime(time) {
  let date = time.getDate();
  let nameMonth = time.getMonth();
  let year = time.getFullYear();
  let hours = time.getHours();
  let minutes = time.getMinutes();

  // mencetak dan mengambil nilai dari variable
  let fullTime = `${date} ${months[nameMonth]} ${year} - 
  ${hours}:${minutes} `;

  return fullTime;
}

//fungsi untuk mengatur jarak waktu
function getDistanceTime(time) {
  // Waktu saat diposting
  let timePost = time;

  // Waktu sekarang saat melihat tampilan
  let timeNow = new Date();

  //selisih waktu saat melihat tampilan & waktu awal posting
  let distance = timeNow - timePost;

  // konversi menjadi hari dalam 1 hari

  let minutes = 60;
  let seconds = 60;
  let miliSecond = 1000; // 1 detik
  let secondInHours = 3600; // detik dalam 1 jam
  let hoursInDay = 23; // jam dalam 1 hari

  let distanceDay = Math.floor(
    distance / (miliSecond * secondInHours * hoursInDay)
  );

  let distanceHours = Math.floor(
    distance / (miliSecond * secondInHours * hoursInDay)
  );

  let distanceMinutes = Math.floor(distance / (miliSecond * seconds));
  let distanceSeconds = Math.floor(distance / miliSecond);

  if (distanceDay >= 1) {
    return `${distanceDay} day ago`;
  } else {
    if (distanceHours >= 1) {
      return `${distanceHours} Hours ago`;
    } else {
      if (distanceMinutes >= 1) {
        return `${distanceMinutes} Minutes ago`;
      } else {
        return `${distanceSeconds} Seconds ago`;
      }
    }
  }
}

setInterval(() => {
  renderBlog();
}, 1000);

getDistanceTime();
