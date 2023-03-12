import { TAB } from "../constant/variables";
import { addEvent } from "../util/addEvent";

export default class Tabbar {
  constructor($target, props) {
    this.$target = $target;
    this.props = props;
    this.render();
    this.setEvent();
  }

  template() {
    return `
  <ul class="flex justify-around">
    <li id="all-restaurants" class="text-subtitle underline flex justify-center p-16">
      모든 음식점
    </li>
    <li id="favorite-restaurants" class="text-subtitle underline flex justify-center p-16">
      자주 가는 음식점
    </li>
  </ul>
    `;
  }

  render() {
    this.$target.innerHTML = this.template();
    const { tab } = this.props;
    const $targetId = this.$target.querySelector("#" + tab);
    $targetId.style.color = "var(--primary-color)";
    $targetId.style.borderColor = "var(--primary-color)";
  }

  setEvent() {
    const { setState, tab } = this.props;

    const $allRestaurants = this.$target.querySelector("#all-restaurants");
    addEvent($allRestaurants, "click", () => {
      if (tab === "favorite-restaurants") {
        setState({ tab: TAB.ALL });
      }
    });

    const $favoriteRestaurants = this.$target.querySelector("#favorite-restaurants");
    addEvent($favoriteRestaurants, "click", () => {
      if (tab === "all-restaurants") {
        setState({ tab: TAB.FAVORITE });
      }
    });
  }
}
