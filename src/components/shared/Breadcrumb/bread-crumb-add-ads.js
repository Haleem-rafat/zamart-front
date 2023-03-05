import { FiHome } from "react-icons/fi";
import { MdNavigateNext } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb } from "semantic-ui-react";
import { useLanguage } from "../../../context/language-context";
import content from "../../../localization/content";
import localizationKeys from "../../../localization/localization-keys";
import routes from "../../../routes";

export const BreadCrumbAddAds = ({ category, sub, complement }) => {
  const { pathname } = useLocation();
  const [lang, setLang] = useLanguage("");
  const selectedContent = content[lang];

  const BreadCrumbAddAdsRoutes = (pathname, category, sub, complement) =>
    [
      {
        key: "Add Ads",
        content: (
          <Link
            className="text-white text-sm font-normal"
            to={routes.app.ceratitems.default}
          >
            <>
              <FiHome size={15} className="text-primary-gray-dark mt-1" />
            </>
          </Link>
        ),
      },
      ...[
        pathname.startsWith(routes.app.ceratitems.selectCategory) && {
          key: "Category",
          content: (
            <Link
              className="text-white text-sm font-normal bg-red-300"
              to={routes.app.ceratitems.selectCategory}
            >
              <p className="mt-1 mx-2">
                {selectedContent[localizationKeys.Category]}
              </p>
            </Link>
          ),
        },
      ],
      ...[
        pathname.startsWith(routes.app.ceratitems.selectSubCategory(sub)) && {
          key: "Category",
          content: (
            <Link
              className="text-white text-sm font-normal"
              to={routes.app.ceratitems.selectSubCategory}
            >
              <p className="flex">
                <p className="mt-1 mx-2 text-primary-gray-dark ">
                  {" "}
                  {selectedContent[localizationKeys.Category]}
                </p>
                <p className="flex">
                  <MdNavigateNext
                    size={15}
                    className="text-primary-gray-dark mt-1"
                  />
                  <p className="mt-1 mx-2">
                    {" "}
                    {selectedContent[localizationKeys.SubCategory]}
                  </p>
                </p>
              </p>
            </Link>
          ),
        },
      ],
      ...[
        pathname.startsWith(
          routes.app.ceratitems.selectComplementCategory(complement)
        ) && {
          key: "Category",
          content: (
            <Link
              className="text-white text-sm font-normal"
              to={routes.app.ceratitems.selectComplementCategory}
            >
              <p className="flex">
                <p className="mt-1 mx-2 text-primary-gray-dark ">
                  {" "}
                  {selectedContent[localizationKeys.Category]}
                </p>
                <p className="flex">
                  <MdNavigateNext
                    size={15}
                    className="text-primary-gray-dark mt-1"
                  />
                  <p className="mt-1 mx-2 text-primary-gray-dark">
                    {selectedContent[localizationKeys.SubCategory]}
                  </p>
                </p>
                <p className="flex">
                  <MdNavigateNext
                    size={15}
                    className="text-primary-gray-dark mt-1"
                  />
                  <p className="mt-1 mx-2">
                    {" "}
                    {selectedContent[localizationKeys.SubCategory]}
                  </p>
                </p>
              </p>
            </Link>
          ),
        },
      ],
      ...[
        pathname.startsWith(routes.app.ceratitems.addDescription) && {
          key: "Category",
          content: (
            <Link
              className="text-white text-sm font-normal"
              to={routes.app.ceratitems.addDescription}
            >
              <p className="flex">
                <p className="mt-1 mx-2 text-primary-gray-dark ">
                  {" "}
                  {selectedContent[localizationKeys.Category]}
                </p>
                <p className="flex">
                  <MdNavigateNext
                    size={15}
                    className="text-primary-gray-dark mt-1"
                  />
                  <p className="mt-1 mx-2 text-primary-gray-dark">
                    {selectedContent[localizationKeys.SubCategory]}
                  </p>
                </p>
                <p className="flex">
                  <MdNavigateNext
                    size={15}
                    className="text-primary-gray-dark mt-1"
                  />
                  <p className="mt-1 mx-2 text-primary-gray-dark">
                    {selectedContent[localizationKeys.SubCategory]}
                  </p>
                </p>
                <p className="flex">
                  <MdNavigateNext
                    size={15}
                    className="text-primary-gray-dark mt-1"
                  />
                  <p className="mt-1 mx-2">
                    {" "}
                    {selectedContent[localizationKeys.description]}
                  </p>
                </p>
              </p>
            </Link>
          ),
        },
      ],
      ...[
        pathname.startsWith(routes.app.ceratitems.uploadImage) && {
          key: "Category",
          content: (
            <Link
              className="text-white text-sm font-normal"
              to={routes.app.ceratitems.uploadImage}
            >
              <p className="flex">
                <p className="mt-1 mx-2 text-primary-gray-dark ">
                  {" "}
                  {selectedContent[localizationKeys.Category]}
                </p>
                <p className="flex">
                  <MdNavigateNext
                    size={15}
                    className="text-primary-gray-dark mt-1"
                  />
                  <p className="mt-1 mx-2 text-primary-gray-dark">
                    {selectedContent[localizationKeys.SubCategory]}
                  </p>
                </p>
                <p className="flex">
                  <MdNavigateNext
                    size={15}
                    className="text-primary-gray-dark mt-1"
                  />
                  <p className="mt-1 mx-2 text-primary-gray-dark">
                    {selectedContent[localizationKeys.SubCategory]}
                  </p>
                </p>
                <p className="flex">
                  <MdNavigateNext
                    size={15}
                    className="text-primary-gray-dark mt-1"
                  />
                  <p className="mt-1 mx-2 text-primary-gray-dark">
                    {" "}
                    {selectedContent[localizationKeys.description]}
                  </p>
                </p>
                <p className="flex">
                  <MdNavigateNext
                    size={15}
                    className="text-primary-gray-dark mt-1"
                  />
                  <p className="mt-1 mx-2">
                    {" "}
                    {selectedContent[localizationKeys.UPLOAD]}
                  </p>
                </p>
              </p>
            </Link>
          ),
        },
      ],
    ].filter(Boolean);

  return (
    <Breadcrumb
      icon="right angle"
      sections={BreadCrumbAddAdsRoutes(pathname, category, sub, complement)}
    />
  );
};
