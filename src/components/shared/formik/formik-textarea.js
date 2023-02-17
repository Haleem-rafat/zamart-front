import { Field } from "formik";
import TextareaForm from "../input-filed/textarea-filed";
import ErrorMessage from "./error-message";

function FormikTextarea({
  label,
  name,
  className,
  placeholder,
  value,
  ...props
}) {
  return (
    <>
      <Field name={name}>
        {({ form, field }) => {
          const { errors, touched } = form;
          return (
            <div>
              <TextareaForm
                placeholder={placeholder}
                value={value}
                {...field}
                {...props}
              />
              {touched[name] && errors[name] && (
                <ErrorMessage message={errors[name]} />
              )}
            </div>
          );
        }}
      </Field>
    </>
  );
}

export default FormikTextarea;
