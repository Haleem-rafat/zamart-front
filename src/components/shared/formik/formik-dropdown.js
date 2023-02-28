import React from "react";
import { Field } from "formik";
import { Form } from "semantic-ui-react";
import ErrorMessage from "./error-message";
import { get } from "wild-wild-path";

function FormikMultiDropdown({
  label,
  name,
  className,
  onChange,
  multiple,
  ...props
}) {
  return (
    <Field name={name}>
      {({ form, field }) => {
        const { setFieldValue, setFieldTouched, errors, touched } = form;
        return (
          <div className="flex flex-col mt-1.5  ">
            <Form.Dropdown
              className={`block mt-2 ${className} Edit_Dropdown `}
              id={name}
              {...field}
              {...props}
              error={Boolean(touched[name] && errors[name])}
              onBlur={() => setFieldTouched(name, true)}
              onChange={(e, { value }) => {
                setFieldValue(name, value);
                if (typeof onChange === "function") onChange(e);
              }}
              multiple={multiple}
              search
              fluid
              selection
            >
              {props.children}
            </Form.Dropdown>
            {get(touched, name) && get(errors, name) && (
              <ErrorMessage message={get(errors, name)} />
            )}
          </div>
        );
      }}
    </Field>
  );
}

export default FormikMultiDropdown;
