import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Login.css";
import { adminLogin } from "../../../Services/adminApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAdminDetails } from "../../../Features/setAdmin";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admin = useSelector((state) => state.admin.value);

  console.log(admin);
  useEffect(() => {
    if (admin?.loginFail === false) {
      navigate("/admin/home");
    }
  }, [navigate, admin]); // Add any dependencies if needed

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invaild email address")
      .required("* This field is required")
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        "Invalid email address"
      ),
    password: Yup.string().required("*This field is requires"),
  });
  const onSubmit = async (values) => {
    try {
      const { data } = await adminLogin(values);
      if (data.status) {
        localStorage.setItem("adminJWT", data.token);
        toast.success(data.message);
        dispatch(setAdminDetails(data.data));
        navigate("/admin/home");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div class="main_div">
      <form class="form" onSubmit={formik.handleSubmit}>
        <div class="form-outline mb-4">
          <label class="form-label mb-4" for="form2Example1">
            Log in to your Dmythra <span>Admin</span> account
          </label>
          {formik.touched.email && formik.errors.email ? (
            <p
              className="text-danger"
              style={{ fontSize: "12px", margin: "0px" }}
            >
              {formik.errors.email}
            </p>
          ) : null}
          <input
            type="email"
            id="form2Example1"
            class="form-control"
            placeholder="Email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
        </div>

        <div class="form-outline mb-4">
          {formik.touched.password && formik.errors.password ? (
            <p
              className="text-danger"
              style={{ fontSize: "12px", margin: "0px" }}
            >
              {formik.errors.password}
            </p>
          ) : null}
          <input
            type="password"
            id="form2Example2"
            className="form-control"
            placeholder="Password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
        </div>

        <div class="row mb-1">
          <div class="col d-flex justify-content-center"></div>
        </div>

        <button type="submit" class="btn btn-primary btn-block mb-4">
          Sign in
        </button>
      </form>
    </div>
  );
}
export default Login;
