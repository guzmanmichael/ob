function previewFile() {
  var preview = document.getElementById("img_show");
  var file = document.querySelector("input[type=file]").files[0];
  var haf = document.querySelector("input[type=file]");
  var reader = new FileReader();

  reader.onloadend = function () {
    preview.src = reader.result;
    console.log(preview);
  };

  if (file) {
    reader.readAsDataURL(file);
    preview.style.display = "block";
    document.getElementById("result").style.display = "inline";
    document.getElementById("LUPL").style.display = "none";
    Detect(preview);
  } else {
    preview.src = "";
  }
}

//Iniciar YOLO

const Detect = function (preview) {
  let cocoSsd;
  let status;
  cocoSsd = ml5.objectDetector("cocossd", modelReady);
  function modelReady() {
    console.log("model Ready!");
    status = true;
    console.log("Detecting");
    cocoSsd.detect(preview, gotResult);
  }

  function gotResult(err, results) {
    if (err) {
      console.log(err);
    }
    objects = results;
    if (objects.length == 0) {
      document.getElementById("result").innerHTML = "No object found";
    } else {
      document.getElementById("result").innerHTML = objects[0]["label"];
    }
  }
};

let reloadApp = document.getElementById("icon");
reloadApp.addEventListener("click", rapp);

function rapp() {
  window.location.reload();
}

let closeApp = document.getElementById("icon_close");
closeApp.addEventListener("click", fcloseapp);

function fcloseapp() {
  document.getElementById("card_wrapper").style.display = "none";
}

let openAbout = document.getElementById("about");
openAbout.addEventListener("click", fopenabout);

function fopenabout() {
  document.getElementById("card_wrapper").style.display = "flex";
}
