import { translateCategory } from "../constant/variables";
import { addEvent } from "../util/addEvent";
import store from "../util/store";
import Star from "./Star";

export default class RestaurantDetail {
  constructor($target, props) {
    this.$target = $target;
    this.props = props;
    this.render();
    this.setEvent();
  }

  template() {
    const { category, name, distance, description, link } = this.props;

    return `
<div>
  <div class="flex justify-between">
    <div class="restaurant__category">
      <img src="./category-${translateCategory[category]}.png" alt="${category}" class="category-icon" />
    </div>
    <div class="star-container"></div>
  </div>
 </div>
<h2 class="mt-16">${name}</h1>
<div>
  <p class="mt-16 text-body restaurant__distance">캠퍼스로부터 ${distance}분 내</p>
  <div class="mt-16 mb-16">${description}</div>
  <a href="${link}">${link}</a>
  <div class="mt-16 button-container">
  <button id="remove-button" class="button button--secondary text-caption">
  삭제하기
</button>
  <button id="quit-button" type="button" class="button button--primary text-caption">
  닫기
  </button>
  </div>
</div>
`;
  }

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  mounted() {
    const $starContainer = this.$target.querySelector(".star-container");

    new Star($starContainer, { ...this.props });
  }

  setEvent() {
    const { name, render } = this.props;
    const $modal = document.querySelector(".modal");

    const $quitButton = this.$target.querySelector("#quit-button");
    addEvent($quitButton, "click", () => {
      $modal.classList.toggle("modal--open");
    });

    const $removeButton = this.$target.querySelector("#remove-button");
    addEvent($removeButton, "click", () => {
      const list = store.getLocalStorage();
      const updatedList = list.filter((obj) => obj.name !== name);
      store.setLocalStorage(updatedList);
      $modal.classList.toggle("modal--open");
      render();
    });
  }
}
