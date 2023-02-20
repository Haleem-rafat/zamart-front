import { FiHome } from "react-icons/fi";
import { MdNavigateNext } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb } from "semantic-ui-react";
import { useLanguage } from "../../../context/language-context";
import routes from "../../../routes";

export const BreadCrumbAddAds = ({ category, sub, complement }) => {
  const { pathname } = useLocation();
  const [lang, setLang] = useLanguage("");
  // const langContent = content[lang];

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
              <p className="mt-1 mx-2">Category</p>
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
                <p className="mt-1 mx-2 text-primary-gray-dark ">Category</p>
                <p className="flex">
                  <MdNavigateNext
                    size={15}
                    className="text-primary-gray-dark mt-1"
                  />
                  <p className="mt-1 mx-2">Sub Category</p>
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
                <p className="mt-1 mx-2 text-primary-gray-dark ">Category</p>
                <p className="flex">
                  <MdNavigateNext
                    size={15}
                    className="text-primary-gray-dark mt-1"
                  />
                  <p className="mt-1 mx-2 text-primary-gray-dark">
                    Sub Category
                  </p>
                </p>
                <p className="flex">
                  <MdNavigateNext
                    size={15}
                    className="text-primary-gray-dark mt-1"
                  />
                  <p className="mt-1 mx-2"> Complement Category</p>
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
                <p className="mt-1 mx-2 text-primary-gray-dark ">Category</p>
                <p className="flex">
                  <MdNavigateNext
                    size={15}
                    className="text-primary-gray-dark mt-1"
                  />
                  <p className="mt-1 mx-2 text-primary-gray-dark">
                    Sub Category
                  </p>
                </p>
                <p className="flex">
                  <MdNavigateNext
                    size={15}
                    className="text-primary-gray-dark mt-1"
                  />
                  <p className="mt-1 mx-2 text-primary-gray-dark">
                    Complement Category
                  </p>
                </p>
                <p className="flex">
                  <MdNavigateNext
                    size={15}
                    className="text-primary-gray-dark mt-1"
                  />
                  <p className="mt-1 mx-2"> Description Ads</p>
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
                <p className="mt-1 mx-2 text-primary-gray-dark ">Category</p>
                <p className="flex">
                  <MdNavigateNext
                    size={15}
                    className="text-primary-gray-dark mt-1"
                  />
                  <p className="mt-1 mx-2 text-primary-gray-dark">
                    Sub Category
                  </p>
                </p>
                <p className="flex">
                  <MdNavigateNext
                    size={15}
                    className="text-primary-gray-dark mt-1"
                  />
                  <p className="mt-1 mx-2 text-primary-gray-dark">
                    Complement Category
                  </p>
                </p>
                <p className="flex">
                  <MdNavigateNext
                    size={15}
                    className="text-primary-gray-dark mt-1"
                  />
                  <p className="mt-1 mx-2 text-primary-gray-dark">
                    {" "}
                    Description Ads
                  </p>
                </p>
                <p className="flex">
                  <MdNavigateNext
                    size={15}
                    className="text-primary-gray-dark mt-1"
                  />
                  <p className="mt-1 mx-2"> Upload Image</p>
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
