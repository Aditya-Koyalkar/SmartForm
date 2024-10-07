import Link from "next/link";
import { MdOutlineFormatAlignLeft } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { IoMdShare } from "react-icons/io";

const Hero = () => {
  return (
    <section className=" bg-[#f2f2f2] h-screen">
      <div className="mx-auto max-w-screen-xl px-4 py-14 lg:flex  flex-col ">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Build Form in
            <strong className="font-extrabold text-primary sm:block">
              {" "}
              Seconds not Hours{" "}
            </strong>
          </h1>

          <div className="mt-4 sm:text-xl/relaxed text-slate-600">
            Create custom forms in seconds with our intuitive AI form builder.
            Designed for ease and efficiency!
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              className="block w-full font-bold rounded bg-primary px-12 py-3 text-sm  text-white shadow hover:bg-purple-800 focus:outline-none focus:ring active:bg-primary sm:w-auto"
              href={`/dashboard`}
            >
              + Create Form with AI
            </Link>

            <a
              className="block bg-[#ffff] w-full border-2 rounded px-12 py-3 text-sm font-medium text-primary shadow hover:text-purple-800 focus:outline-none focus:ring active:text-primary sm:w-auto"
              href="#"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
      <div className=" text-[35px] font-extrabold text-center">
        How It Works ?
      </div>
      <div className=" flex flex-col md:flex-row gap-5  justify-center  items-center  p-10 md:p-14">
        <div className=" shadow-lg bg-[#ffff] rounded-xl px-4 py-6 h-[200px] md:w-[800px]">
          <div className="flex items-center gap-3">
            <MdOutlineFormatAlignLeft className="h-[25px] w-[25px] text-black" />
            <div className=" text-[20px] font-bold">
              Write a Prompt for your Form
            </div>
          </div>
          <div className="text-slate-600 mt-2 text-sm ">
            Craft a clear and concise prompt that outlines the purpose of your
            form.your prompt will guide the AI in generating relevant fields and
            questions tailored to your requirements.
          </div>
        </div>
        <div className=" shadow-lg bg-[#ffff] rounded-xl px-4 py-6 h-[180px] md:w-[800px]">
          <div className="flex items-center gap-3">
            <CiEdit className="h-[25px] w-[25px] text-black" />
            <div className=" text-[20px] font-bold text-center">
              Edit Your Form
            </div>
          </div>
          <div className="text-slate-600 mt-2 text-sm ">
            Take a moment to review and refine it. You can easily modify any
            field, adjust question types, or add new elements to ensure the form
            meets your specific needs.
          </div>
        </div>
        <div className=" shadow-lg bg-[#ffff] rounded-xl px-4 py-6 h-[180px] md:w-[800px]">
          <div className="flex items-center gap-3">
            <IoMdShare className="h-[25px] w-[25px] text-black" />
            <div className=" text-[20px] font-bold ">
              Share & Start Accepting Responses
            </div>
          </div>
          <div className="text-slate-600 mt-2 text-sm">
            Share with your audience through link via social media and As the
            responses coming in we will make the data collection effortless
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
