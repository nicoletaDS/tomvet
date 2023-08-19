import { Link } from "react-router-dom";
import { DropdownOptions } from "../../../utils/constants/UserMeniu";
import { personal } from "../../../utils/constants/Personal";

const Profile = () => {
  const user = personal[0];
  return (
    <div className="flex px-14">
      <section className="w-2/4  max-w-[300px] pr-10">
        <div className="bg-helllilac rounded-xl p-4 pb-10 flex flex-col items-center">
          <div className="w-4/6 h-auto rounded-xl">
            <img
              className="rounded-xl h-full"
              src="/images/profile_img.jpg"
              alt="img"
            />
          </div>
          <Link to="" className="mt-4 hover:font-semibold">
            Adauga poza
          </Link>
          <div className="bg-lilac w-full h-[1px] mt-2" />

          {DropdownOptions.map((item: any, index: number) => {
            return (
              <div key={index} className="mt-8 w-full text-center">
                <Link to={item.path} className="hover:font-semibold">
                  {item.title}
                </Link>
                <div className="bg-lilac  w-full h-[1px] mt-2" />
              </div>
            );
          })}
        </div>
      </section>

      <section className="w-full">
        <div className="bg-helllilac rounded-xl w-full justify-center items-center content-center">
          <h2 className="flex justify-center text-xl text-center font-bold my-3 pt-10">
            Comenzile mele:
          </h2>
          <div className="flex flex-row justify-between items-center p-8">
            <div className="flex flex-row relative pb-10 pl-12">
              <div className="flex flex-col mr-16">
                <p className="font-bold mt-4">Nume:</p>
                <p className="font-light">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="font-bold mt-4">Telefon:</p>
                {user?.phone}
              </div>
              <div className="flex flex-col">
                <p className="font-bold mt-4">Email:</p>
                <p className="font-light">{user?.email}</p>

                <p className="font-bold mt-4">Adresa:</p>
                <p className="font-light">
                  Str: {user?.address?.str}, Nr. {user?.address?.nr}
                </p>
                <p className="font-light">
                  {user?.address?.city}, {user?.address?.county},{" "}
                  {user?.address?.postalCode}
                </p>
              </div>

              <button className="absolute bottom-0 mt-12 underline hover:font-bold hover:cursor-pointer">
                modifica...
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
