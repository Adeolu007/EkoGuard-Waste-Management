import moment from "moment";
import React from "react";
import { SWMimages } from "../../assets";
import {
  AppDatePicker,
  Button,
  FormInput,
  FormSelect,
  Loader,
} from "../../components";

const WasteRecycling = ({
  formik,
  isLoading,
  categoryOption,
  locationOption,
  binOrBagOption,
  binRequestOption,
}) => {
  const pickUpDays = {
    2: "Mondays",
    3: "Tuesdays",
    4: "Wednesdays",
    5: "Thursdays",
  };
  const [pod, setPod] = React.useState();
  return (
    <div className="w-full m-auto max-w-[1000px] px-4">
      <div className="grid items-center justify-center">
        <h1 className="font-['YsabeauInfant'] text-center text-[35px] font-bold mt-3">
          Recycling Pick-Up Request
        </h1>
        <div className="grid place-items-center">
          <img
            src={SWMimages.recycle_image}
            alt=""
            className="object-contain max-w-[12rem]"
          />
        </div>
      </div>
      <form onSubmit={formik.handleSubmit} className="space-y-8">
        <div>
          <FormSelect
            size="lg"
            options={binRequestOption}
            id="binRequest"
            name="binRequest"
            placeholder="Choose"
            value={formik.values.binRequest}
            touched={formik.touched.binRequest}
            onChange={formik.handleChange}
            errors={formik.errors.binRequest}
            className="w-full "
            label="Bin Request"
          />
        </div>
        {formik?.values?.binRequest === "true" && (
          <div className="dropInField">
            <FormInput
              size="lg"
              type="number"
              id="binQuantity"
              name="binQuantity"
              value={formik.values.binQuantity}
              touched={formik.touched.binQuantity}
              onChange={formik.handleChange}
              errors={formik.errors.binQuantity}
              className="w-full"
              label="Quantity of Bins"
            />
          </div>
        )}
        <div>
          <FormSelect
            size="lg"
            type="text"
            options={categoryOption}
            id="category"
            name="category"
            placeholder="Select Category"
            value={formik.values.category}
            touched={formik.touched.category}
            onChange={formik.handleChange}
            errors={formik.errors.category}
            className="w-full "
            label="Select Category"
          />
        </div>
        <div className="mb-8">
          <FormSelect
            size="lg"
            options={binOrBagOption}
            id="binOrBag"
            name="binOrBag"
            placeholder="Choose"
            value={formik.values.binOrBag}
            touched={formik.touched.binOrBag}
            onChange={formik.handleChange}
            errors={formik.errors.binOrBag}
            className="w-full "
            label="Recycle Bin Or Recycle Bag"
          />
        </div>
        {formik?.values?.binOrBag && (
          <div className="dropInField">
            <FormInput
              size="lg"
              type="number"
              id="quantityOfBagsOrBins"
              name="quantityOfBagsOrBins"
              value={formik.values.quantityOfBagsOrBins}
              touched={formik.touched.quantityOfBagsOrBins}
              onChange={formik.handleChange}
              errors={formik.errors.quantityOfBagsOrBins}
              className="w-full"
              label="Quantity of Bins or Bags"
            />
          </div>
        )}
        <div>
          <FormSelect
            size="lg"
            options={locationOption}
            id="location"
            name="location"
            message={
              formik?.values?.location
                ? pickUpDays[formik?.values?.location]
                : false
            }
            placeholder="Select Location"
            value={formik.values.location}
            touched={formik.touched.location}
            onChange={formik.handleChange}
            errors={formik.errors.location}
            className="w-full "
            label="Location"
          />
        </div>

        {formik?.values?.location && (
          <div className="dropInField">
            <div>
              <AppDatePicker
                size="lg"
                type="text"
                id="pickUpDate"
                name="pickUpDate"
                value={formik?.values?.pickUpDate}
                touched={formik.touched.pickUpDate}
                // onChange={formik.handleChange}
                onChange={(date) => {
                  setPod(date);
                  formik.setFieldValue(
                    "pickUpDate",
                    moment(date).format("YYYY-MM-DD")
                  );
                }}
                errors={formik.errors.pickUpDate}
                className="w-full"
                label="Pickup Date"
                message={
                  formik?.values?.location
                    ? pickUpDays[formik?.values?.location]
                    : false
                }
              />
            </div>
            <div>
              <FormInput
                size="lg"
                type="text"
                id="address"
                name="address"
                value={formik.values.address}
                touched={formik.touched.address}
                onChange={formik.handleChange}
                errors={formik.errors.address}
                className="w-full"
                label="Pickup Address"
              />
            </div>
          </div>
        )}
        <div className="flex items-center justify-center py-10">
          <Button
            type="submit"
            variant="full"
            size="lg"
            className="text-[12px]"
          >
            {isLoading ? <Loader /> : "Schedule Request"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WasteRecycling;
