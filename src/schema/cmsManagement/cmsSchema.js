import * as Yup from "yup";

const cms = Yup.object({
    title: Yup.string().required("This field is required."),
    image: Yup.string().required("This field is required.")
});

export default cms;