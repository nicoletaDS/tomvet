import { Link, useParams } from "react-router-dom";

import React from "react";
import AppointmentModal from "../calendar/components/AppointmentModal";
import { treatments } from "../../utils/constants/Treatments";
import { Tasks } from "../../utils/constants/Tasks";
import PetModal from "./components/PetModal";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import PetCard from "./components/PetCard";

const PetsScreen = (props: any) => {
  const { pets, loading, error } = useSelector(
    (state: RootState) => state.pets
  );
  const [pet, setPet] = React.useState<Pet | null>(null);
  const { id } = useParams();

  React.useEffect(() => {
    if (id !== undefined) {
      const selectedPet = pets.find((item) => item.id === Number(id));
      setPet(selectedPet || null);
    } else if (pets.length > 0) {
      setPet(pets[0]);
    }
  }, [id, pets]);

  const [petModalIsOpen, setPetModalIsOpen] = React.useState(false);

  function openPetModal() {
    setPetModalIsOpen(true);
  }

  function closePetModal() {
    setPetModalIsOpen(false);
  }

  return (
    <div className="mt-6 px-10 flex flex-row">
      <div className="bg-helllilac flex flex-col items-center rounded-xl py-4 w-1/5 mr-6">
        <h2 className="flex justify-center text-xl text-center font-bold my-3">
          Prietenii mei
        </h2>
        <button
          className="bg-lilac rounded-full w-fit px-4 py-1 mr-2 mb-6 text-white hover:underline"
          onClick={openPetModal}
        >
          + adauga animal
        </button>
        <PetModal modalIsOpen={petModalIsOpen} closeModal={closePetModal} />
        {pets.map((pet: any, index: number) => (
          <Link
            key={pet.id}
            to={`/animale/${String(pet.id)}`}
            className="flex flex-col justify-center items-center px-6 hover:cursor-pointer"
          >
            <div className="w-[70%] mt-10 hover:w-[80%] ">
              <img src={`pet.image`} alt="" />
            </div>
            <p className="mt-1 hover:font-bold ">{pet.name}</p>
            <hr className="bg-lilac w-full h-.5 rounded-full" />
          </Link>
        ))}
        <div className="pb-10" />
      </div>

      <div className="flex flex-col w-full">
        {pet && <PetCard pet={pet} />}
        {pet === null && (
          <p className="bg-helllilac rounded-xl text-center py-10">
            Adauga un animal pentru a tine evidenta tratamentelor acestuia.
          </p>
        )}
      </div>
    </div>
  );
};

export default PetsScreen;
