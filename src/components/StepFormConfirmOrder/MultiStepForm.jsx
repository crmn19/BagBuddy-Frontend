import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import DatiOrdineCustomers from "../UtenteDashboard/DatiOrdineCustomers";
import RiepilogoOrdine from "../UtenteDashboard/RiepilogoOrdine";
import MyNavbar from "../MyNavbar";
import { MdArrowBackIos } from "react-icons/md";

const MultiStepForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    indirizzo: {
      via: "",
      cap: "",
      provincia: "",
      comune: "",
      civico: "",
    },
    metodoSpedizione: "standard",
    orderDetails: null,
    addressDetails: null,
    customer: null,
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);
  const updateFormData = newData =>
    setFormData(prev => ({ ...prev, ...newData }));

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <DatiOrdineCustomers
            formData={formData}
            setFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );

      case 1:
        return <RiepilogoOrdine formData={formData} prevStep={prevStep} />;
      default:
        return (
          <DatiOrdineCustomers
            formData={formData}
            setFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
    }
  };

  return <>{renderStep()}</>;
};

export default MultiStepForm;
