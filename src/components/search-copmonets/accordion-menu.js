import React, { useState } from "react";
import { Accordion, Dropdown, Form, Input, Menu } from "semantic-ui-react";
import useFilter from "../../hooks/use-filter";
import useGetGatogry from "../../hooks/use-get-gatogry";
import { useDebouncedCallback } from "use-debounce";

const AccordionMenu = () => {
  const { GatogryOptions, loadingGatogry } = useGetGatogry();
  const [CatID, setGatogryId] = useState();
  const [categoriesFilter, setCategoriesFiter] = useFilter("category", "");
  const [transimision, setTransmission] = useFilter("transimision", "");
  const [priceFrom, setPriceFrom] = useFilter("priceFrom", "");
  const [priceTo, setPriceTo] = useFilter("priceTo", "");

  const debouncedone = useDebouncedCallback(
    (value) => setPriceFrom(value),
    750
  );
  const debouncedtwo = useDebouncedCallback((value) => setPriceTo(value), 750);

  const TRANSMISSIONTYPEFOPTION = [
    { lable: "MANUAL", name: "MANUAL", value: "MANUAL" },
    { lable: "AUTOMATIC", name: "AUTOMATIC", value: "AUTOMATIC" },
  ];

  const ALLMANUFACTURES = (
    <Form className="py-4">
      <Form.Group className="bg-primary-black-med text-white text-2xl " grouped>
        {GatogryOptions?.map((e) => (
          <Form.Checkbox
            className="text-white py-2 mx-6"
            label={e?.text}
            name={e?.text}
            value={e?.value}
            onChange={(e, { value }) => {
              setGatogryId(value);
              setCategoriesFiter(value);
            }}
          />
        ))}
      </Form.Group>
    </Form>
  );

  const TRANSMISSIONTYPEF = (
    <Form className="">
      <Form.Group className="bg-primary-black-med text-white text-2xl " grouped>
        {TRANSMISSIONTYPEFOPTION.map((e) => (
          <Form.Checkbox
            className="text-white py-2 mx-6"
            label={e?.lable}
            name={e?.text}
            value={e?.value}
            onChange={(e, { value }) => setTransmission(value)}
          />
        ))}
      </Form.Group>
    </Form>
  );

  const PRICE = (
    <Form className="py-4">
      <div className="flex gap-x-5 mx-2">
        <Input
          type="number"
          className="Edit_Input  mt-0.5 "
          placeholder="1"
          onChange={(e, { value }) => {
            debouncedone(value);
          }}
        />
        <Input
          type="number"
          className="Edit_Input  mt-0.5 "
          placeholder="1000,0000"
          onChange={(e, { value }) => {
            debouncedtwo(value);
          }}
        />
      </div>
    </Form>
  );

  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <Accordion className="w-full p-0 bg-black text-white " as={Menu} vertical>
      <Menu.Item className="w-full p-0 m-0">
        <Accordion.Title
          className="my-4"
          active={activeIndex === 0}
          content="ALL MANUFACTURES"
          index={0}
          onClick={handleClick}
        />
        <Accordion.Content
          active={activeIndex === 0}
          content={ALLMANUFACTURES}
        />
      </Menu.Item>

      <Menu.Item className="w-full p-0 m-0">
        <Accordion.Title
          className="my-4"
          active={activeIndex === 1}
          content="TRANSMISSION TYPEF"
          index={1}
          onClick={handleClick}
        />
        <Accordion.Content
          active={activeIndex === 1}
          content={TRANSMISSIONTYPEF}
        />
      </Menu.Item>

      <Menu.Item className="w-full p-0 m-0">
        <Accordion.Title
          className="my-4"
          active={activeIndex === 2}
          content="PRICE"
          index={2}
          onClick={handleClick}
        />
        <Accordion.Content active={activeIndex === 2} content={PRICE} />
      </Menu.Item>
    </Accordion>
  );
};

export default AccordionMenu;
