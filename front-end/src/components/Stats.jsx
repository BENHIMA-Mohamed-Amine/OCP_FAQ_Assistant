import React from "react";

export const Stats = () => {
  // const targets = [
  //   {
  //     element: document.getElementById("starsCount"),
  //     count: 4670,
  //     suffix: "+",
  //   },
  //   {
  //     element: document.getElementById("downloadsCount"),
  //     count: 80000,
  //     suffix: "+",
  //   },
  //   {
  //     element: document.getElementById("sponsorsCount"),
  //     count: 100,
  //     suffix: "+",
  //   },
  // ];

  // // Find the maximum count among all targets
  // const maxCount = Math.max(...targets.map((target) => target.count));

  // // Function to animate count-up effect
  // function animateCountUp(target, duration) {
  //   let currentCount = 0;
  //   const increment = Math.ceil(target.count / (duration / 10));

  //   const interval = setInterval(() => {
  //     currentCount += increment;
  //     if (currentCount >= target.count) {
  //       clearInterval(interval);
  //       currentCount = target.count;
  //       target.element.textContent = currentCount + target.suffix;
  //     } else {
  //       target.element.textContent = currentCount;
  //     }
  //   }, 10);
  // }

  // // Animate count-up for each target with adjusted duration
  // targets.forEach((target) => {
  //   animateCountUp(target, maxCount / 100); // Adjust duration based on max count
  // });
  return (
    <div className="bg-gray-50 my-5">
      <div className="bg-gray-50">
        <div className="relative">
          {/* <div className="absolute inset-0 h-1/2 bg-gray-50"></div> */}
          <div className="relative max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <dl className="bg-white rounded-lg shadow-lg sm:grid sm:grid-cols-3">
                <div className="flex justify-between p-4 text-center border-b border-gray-100 dark:border-gray-700 sm:border-0 sm:border-r">
                  <img
                    src="./src/assets/Group 10.png"
                    alt="user icon"
                    className="h-[50px] w-[50px] lg:h-[80px] lg:w-[80px] "
                  />
                  <div>
                    <dt className="order-2 my-2 text-sm text-main" id="item-1">
                      Total Users
                    </dt>
                    <dd
                      className="order-1 text-xl lg:text-4xl font-extrabold leading-none text-main"
                      aria-describedby="item-1"
                      id="starsCount"
                    >
                      0
                    </dd>
                  </div>
                </div>
                <div className="flex justify-between p-4 text-center border-b border-gray-100 dark:border-gray-700 sm:border-0 sm:border-r">
                  <img
                    src="./src/assets/Group 10 (1).png"
                    alt="user icon"
                    className="h-[50px] w-[50px] lg:h-[80px] lg:w-[80px]"
                  />
                  <div>
                    <dt className="order-2 my-2 text-sm text-main">
                      Total Ussues
                    </dt>
                    <dd
                      className="order-1 text-xl lg:text-4xl font-extrabold leading-none text-main"
                      id="downloadsCount"
                    >
                      0
                    </dd>
                  </div>
                </div>
                <div className="flex justify-between p-4 text-center border-b border-gray-100 dark:border-gray-700 sm:border-0 sm:border-r">
                  <img
                    src="./src/assets/Group 10 (2).png"
                    alt="user icon"
                    className="h-[50px] w-[50px] lg:h-[80px] lg:w-[80px]"
                  />
                  <div>
                    <dt className="order-2 my-2 text-sm text-main">
                      Total Admins
                    </dt>
                    <dd
                      className="order-1 text-xl lg:text-4xl font-extrabold leading-none text-main"
                      id="sponsorsCount"
                    >
                      0
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
