import { Button, FormInput, Loader, Modal } from "../../components";
import ContactUsModal from "./ContactUsModal";

const ContactUsView = ({
  isLoading,
  formik,
  openModal,
  setOpenModal,
  handlePhoneInputChange,
}) => {
  return (
    <div className="m-auto max-w-[1000px] px-4">
      <h1 className="text-center text-[35px] font-bold mb-[2rem] mt-3">
        Contact Us
      </h1>
      <form
        onSubmit={formik.handleSubmit}
        className=" space-y-6 w-full h-full place-items-center gap-6"
      >
        <div>
          <FormInput
            size="lg"
            type="text"
            id="email"
            name="email"
            value={formik.values.email}
            touched={formik.touched.email}
            onChange={formik.handleChange}
            errors={formik.errors.email}
            className="w-full"
            label="Email"
          />
        </div>
        <div>
          <FormInput
            size="lg"
            type="text"
            id="firstName"
            name="firstName"
            value={formik.values.firstName}
            touched={formik.touched.firstName}
            onChange={formik.handleChange}
            errors={formik.errors.firstName}
            className="w-full"
            label="First Name"
          />
        </div>
        <div>
          <FormInput
            size="lg"
            type="text"
            id="lastName"
            name="lastName"
            value={formik.values.lastName}
            touched={formik.touched.lastName}
            onChange={formik.handleChange}
            errors={formik.errors.lastName}
            className="w-full"
            label="Last Name"
          />
        </div>
        <div>
          <FormInput
            size="lg"
            type="tel"
            id="phone"
            name="phone"
            value={formik.values.phone}
            // placeholder="Enter phone address"
            onChange={handlePhoneInputChange}
            errors={formik.errors.phone}
            touched={formik.touched.phone}
            // className="w-full"
            label="Phone"
          />
        </div>
        <div>
          <FormInput
            size="lg"
            type="text"
            id="subject"
            name="subject"
            value={formik.values.subject}
            touched={formik.touched.subject}
            onChange={formik.handleChange}
            errors={formik.errors.subject}
            className="w-full"
            label="Subject"
          />
        </div>

        <div>
          <FormInput
            size="lg"
            type="textarea"
            id="description"
            name="description"
            value={formik.values.description}
            touched={formik.touched.description}
            onChange={formik.handleChange}
            errors={formik.errors.description}
            className="w-full"
            label="Description"
          />
        </div>
        <div className="flex items-center justify-center py-10">
          <Button
            type="submit"
            variant="full"
            size="lg"
            className="text-[12px]"
          >
            {isLoading ? <Loader /> : "Reach Us"}
          </Button>
        </div>
      </form>
      {openModal && (
        <Modal
          content={<ContactUsModal setOpenModal={setOpenModal} />}
          setOpenModal={() => setOpenModal(false)}
        />
      )}
    </div>
  );
};

export default ContactUsView;
