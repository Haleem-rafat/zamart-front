import { Dropdown } from "semantic-ui-react";
import En from "../../../src/assets/icons/En_icon.png";
import Ar from "../../../src/assets/icons/Ar_icon.png";
import { useLanguage } from "../../context/language-context";
import content from "../../localization/content";
import localizationKeys from "../../localization/localization-keys";

const DropdownLang = () => {
  const [lang, setLang] = useLanguage("");
  const selectedContent = content[lang];

  const langOptions = [
    {
      key: "English",
      text: selectedContent[localizationKeys.English],
      value: "en",
      image: <img className="w-6 h-6 mt-[.5px] " src={En} alt="en" />,
    },
    {
      key: "Arabic",
      text: selectedContent[localizationKeys.Arabic],
      value: "ar",
      image: <img className="w-6 h-6 mt-[.5px] " src={Ar} alt="en" />,
    },
  ];

  return (
    <div dir="">
      <Dropdown
        className="text-black Edit_Lang_Dropdown bg-white text-xl rounded-xl p-2  "
        inline
        options={langOptions}
        defaultValue={
          lang === "en" ? langOptions[0].value : langOptions[1].value
        }
        onChange={(e, { value }) => setLang(value)}
      />
    </div>
  );
};
export default DropdownLang;
