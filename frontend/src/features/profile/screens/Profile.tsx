import { Link } from "react-router-dom";
import { personal } from "../../../utils/constants/Personal";
import PersonalDetails from "../components/PersonalDetails";
import Orders from "../components/Orders";

const Profile = () => {
  const user = personal[0];
  console.log("in profile");
  return (
    <div className="flex px-14">
      <section className="w-2/4  max-w-[300px] pr-8 mt-3">
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

          <PersonalDetails user={user} />
        </div>
      </section>

      <section className="w-full">
        <div className="bg-helllilac rounded-xl w-full justify-center items-center content-center">
          <h2 className="flex justify-center text-xl text-center font-bold my-3 pt-10">
            Comenzile mele:
          </h2>
          <Orders />
        </div>
      </section>
    </div>
  );
};

export default Profile;
