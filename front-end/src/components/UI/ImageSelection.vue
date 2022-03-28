<template>
  <div id="imageSelectBox">
    <div id="currentImageHolder" class="d-flex flex-column align-items-md-center">
      <img class="img-fluid p-2" id="preview" :src="currentPhoto" />
    </div>
    <div class="d-flex flex-column align-items-center">
      <label class="imgbutton p-2" @mouseover="hover">
        Upload Image
        <input
          class="file-input ps-2"
          ref="fileInput"
          type="file"
          accept="image/*"
          value="Upload Images"
          @input="onSelectFile"
          hidden
        />
      </label>
    </div>
    <div class="d-flex flex-row flex-wrap p-2 m-1" id="imglist">
      <div v-for="image in photoArray" :key="image.id">
        <img
          :src="image.photo"
          class="smallImg"
          v-on:click="updateCurrentPhoto(image.photo)"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "imgselector",
})
export default class ImageSelector extends Vue {
  constructor() {
    super();
  }

  onSelectFile() {
    const input = this.$refs.fileInput;
    const files = input.files;
    console.log(files)
    if (files && files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (e) => {
        let photo = { photo: reader.result, id: this.photoArray.length };
        this.photoArray.push(photo);
        this.fileArray.push(files[0])
        this.currentPhoto = photo.photo;
        this.$emit("newPhoto", this.fileArray);
      };
    }
  }
  data() {
    return {
      photoArray: [],
      fileArray:[],
      currentPhoto: undefined,
    };
  }
  updateCurrentPhoto(clickedPhoto) {
    this.currentPhoto = clickedPhoto;
  }
  hover(event) {
    let btn = event.target;
    console.log('a')
    btn.onmousemove = function (e) {
      let rect = e.target.getBoundingClientRect();
      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;
      btn.style.setProperty("--xz", x + "px");
      btn.style.setProperty("--yz", y + "px");
    };
  }
}
</script>

<style scoped>
:root {
  --xz: 0%;
  --yz: 0%;
}
#preview {
  min-width: 250px;
  max-height: 290px;
}
img[class*="smallImg"] {
  border: solid black 1px;
  width: 60px;
  height: 60px;
}
#currentImageHolder {
  height: 290px;
}
#imageSelectBox {
  border: gray solid 1px;
  min-height: 425px;
  background: darkgray;
}
#imglist {
  border-top: grey solid 1px;
}

.imgbutton {
  color: black;
  background-color: rgb(10, 118, 248);
  border: black solid 1px;
  border-radius: 10px;

  width: fit-content;
  white-space: nowrap;

}

.imgbutton:hover {
  background: radial-gradient(
    circle at var(--xz) var(--yz), rgb(48, 159, 187) 2px, rgb(10, 118, 248)
  );

}
.imgbutton:active {
  background: radial-gradient(
    circle at var(--xz) var(--yz), rgb(3, 39, 83) 2px, rgb(10, 118, 248)
  );
  color:white

}
</style>