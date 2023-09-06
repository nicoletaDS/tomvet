import React from "react";
import TreatmentModal from "./TreatmentModal";
import { treatments } from "../../../utils/constants/Treatments";
import { backendURL } from "../../../utils/constants/link";

const PetCard = ({ pet }: any) => {
  const [treatmentModalIsOpen, setTreatmentModalIsOpen] = React.useState(false);
  function openTreatmentModal() {
    console.log("open");
    setTreatmentModalIsOpen(true);
  }

  function closeTreatmentModal() {
    setTreatmentModalIsOpen(false);
  }

  return (
    <>
      <div className="bg-helllilac rounded-xl w-full justify-center items-center content-center">
        <div className="flex flex-row justify-between items-center p-8">
          <div className="flex flex-row relative py-12">
            <div className="flex flex-col mr-10">
              <p className="font-bold mt-4">Nume:</p>
              <p className="font-light">{pet?.name}</p>

              <p className="font-bold mt-4">Stapan:</p>
              <p className="font-light">{pet?.owner}</p>

              <p className="font-bold mt-4">Data nasterii:</p>
              {pet?.birthday}
            </div>
            <div className="flex flex-col">
              <p className="font-bold mt-4">Cip nr.:</p>
              <p className="font-light">{pet?.cipNr}</p>

              <p className="font-bold mt-4">Pasaport:</p>
              {pet?.passport ? (
                <p className="font-light">DA</p>
              ) : (
                <p className="font-light">NU</p>
              )}

              <p className="font-bold mt-4">Greutate.:</p>
              <p className="font-light">{pet?.weight} kg</p>
            </div>

            <button className="absolute bottom-0 mt-10 underline hover:font-bold hover:cursor-pointer">
              modifica...
            </button>
          </div>

          <div className="h-[300px]">
            <img
              className="h-full rounded-xl"
              src={backendURL + pet.image}
              alt="img"
            />
            <div className="bg-white opacity-[65%] rounded-xl h-[35px] flex justify-center text-[30px] text-center pb-8 mx-3 mt-[-50px]">
              {pet?.name}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-helllilac rounded-xl flex justify-center items-center my-10 w-full">
        <div className="w-full rounded-xl flex flex-col justify-center align-center items-center px-10">
          <h2 className="flex justify-center text-xl text-center font-bold my-3 pt-4">
            Carnet de sanatate:
          </h2>

          <div className="w-full flex flex-row justify-center">
            <div className="px-10 mr-10">
              <h2 className=" flex justify-center text-xl text-center my-3 pt-4">
                Urmatorul Tratament <br /> / Programare:{" "}
              </h2>
              <button
                className="bg-white rounded-full w-full border py-1 mb-6 hover:text-white hover:bg-lilac"
                onClick={openTreatmentModal}
              >
                + adauga tratament
              </button>
              <TreatmentModal
                modalIsOpen={treatmentModalIsOpen}
                closeModal={closeTreatmentModal}
              />

              {pet.id === 2 &&
                treatments.map((treatment: any, index: number) => (
                  <div className="bg-white relative rounded-xl p-4 mb-4">
                    <button className="absolute font-bold right-2 top-0 text-xl hover:text-[24px]">
                      ...
                    </button>
                    <p className="font-bold mt-2 pr-10">{treatment.title}</p>
                    <p>{treatment.date}</p>
                  </div>
                ))}
            </div>

            <div className="ml-10">
              <h2 className="flex justify-center text-xl text-center my-3 pt-4">
                Istoric Tratamente:
              </h2>
              {pet.id === 2 &&
                treatments.map((treatment: any, index: number) => (
                  <div className="bg-white relative max-w-[400px] rounded-xl p-4 mb-4">
                    <button className="absolute font-bold right-2 top-0 text-xl hover:text-[24px]">
                      ...
                    </button>
                    <p className="font-bold mt-2 pr-10">{treatment.title}</p>
                    <p>{treatment.details}</p>
                    <p>{treatment.date}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PetCard;
