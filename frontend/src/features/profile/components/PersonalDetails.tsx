const PersonalDetails = ({ user }: any) => {
  return (
    <div className="flex flex-col justify-between items-center p-8">
      <p className="font-bold mt-4">Nume:</p>
      <p className="font-light">
        {user?.firstName} {user?.lastName}
      </p>
      <p className="font-bold mt-6">Telefon:</p>
      {user?.phone}

      <p className="font-bold mt-6">Email:</p>
      <p className="font-light">{user?.email}</p>

      <p className="font-bold mt-6">Adresa:</p>
      <p className="font-light">
        Str: {user?.address?.str}, Nr. {user?.address?.nr}
      </p>
      <p className="font-light text-center">
        {user?.address?.city}, {user?.address?.county},{" "}
        {user?.address?.postalCode}
      </p>

      <button className="mt-12 underline hover:font-bold hover:cursor-pointer">
        modifica...
      </button>
    </div>
  );
};

export default PersonalDetails;
