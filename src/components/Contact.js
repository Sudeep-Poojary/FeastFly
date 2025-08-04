const Contact = () => {
  return (
    <div className="content-center justify-items-center">
      <h1 className="font-bold text-3xl m-4 p-4">Contact Us</h1>
      <form>
        <input
          type="text"
          placeholder="Name"
          className="border border-black m-2 p-2 rounded-lg"
        />
        <input
          type="text"
          placeholder="Message"
          className="border border-black m-2 p-2 rounded-lg"
        />
        <button className="border border-black m-2 p-2 bg-gray-300 rounded-lg">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
