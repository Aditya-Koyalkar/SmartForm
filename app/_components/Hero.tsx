import Link from "next/link";

const Hero = () => {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen ">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Build Form in
            <strong className="font-extrabold text-primary sm:block">
              {" "}
              Seconds not Hours{" "}
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed text-slate-600">
            Create custom forms in seconds with our intuitive AI form builder.
            Designed for ease and efficiency!
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              className="block w-full font-bold rounded bg-primary px-12 py-3 text-sm  text-white shadow hover:bg-purple-800 focus:outline-none focus:ring active:bg-primary sm:w-auto"
              href={`/dashboard`}
            >
              + Create Form with AI
            </Link>

            <a
              className="block w-full border-2 rounded px-12 py-3 text-sm font-medium text-primary shadow hover:text-purple-800 focus:outline-none focus:ring active:text-primary sm:w-auto"
              href="#"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
