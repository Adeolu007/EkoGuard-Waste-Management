import { SWMimages } from "../assets";

import {
  SCHEDULE_HISTORY,
  WASTE_DISPOSAL,
  WASTE_RECYCLING,
} from "../routes/CONSTANTS";

export const ServiceDetails = [
  {
    id: 1,
    name: "Waste Disposal",
    icon: SWMimages.waste_in_icon,
    title: "Schedule Disposal",
    link: WASTE_DISPOSAL,
    subText:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae expedita eligendi ducimus nisi praesentium itaque.",
  },
  {
    id: 2,
    name: "Waste Recycling",
    icon: SWMimages.white_man,
    title: "Schedule Recycling",
    link: WASTE_RECYCLING,
    subText:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae expedita eligendi ducimus nisi praesentium itaque.",
  },
  {
    id: 3,
    name: "Wallet",
    icon: SWMimages.wallet_icon,
    title: "View Balance & Rewards",
    link: "",
    subText:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae expedita eligendi ducimus nisi praesentium itaque.",
  },
  {
    id: 4,
    name: "Schedule History",
    icon: SWMimages.calendar_icon,
    title: "View History",
    link: "",
    subText:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae expedita eligendi ducimus nisi praesentium itaque.",
  },
  {
    id: 5,
    name: "Resources",
    icon: SWMimages.resources,
    title: "View Resources",
    link: "",
    subText:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae expedita eligendi ducimus nisi praesentium itaque.",
  },
  {
    id: 6,
    name: "News Feeds",
    icon: SWMimages.news_feeds,
    title: "View News Feeds",
    link: "",
    subText:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae expedita eligendi ducimus nisi praesentium itaque.",
  },
];
