import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { useState } from "react";
const payWithPaystack = ({ email, amount, onSuccess }) => {
  if (!email) return;

  const handler = window.PaystackPop.setup({
  key: "pk_test_a79b03c08389a284eb1c5cb1add352d033c9e5f2",
  email: email,
  amount: amount * 100,
  currency: "NGN",
  ref: "REF-" + Date.now(),

  metadata: {
    custom_fields: [
      {
        display_name: "Book",
        variable_name: "book_title",
        value: "Cooing Of A Homing Pigeon"
      },
      {
        display_name: "Format",
        variable_name: "format",
        value: copyType === "soft" ? "Soft Copy" : "Hard Copy"
      },
      {
        display_name: "Delivery",
        variable_name: "delivery",
        value: deliveryType || "N/A"
      }
    ]
  },

  callback: function (response) {
    console.log("Payment Successful! Reference:", response.reference);
    onSuccess?.();

    // optional: auto-download soft copy
    if (copyType === "soft") {
      downloadBook();
    }
  },

  onClose: function () {
    console.log("Payment window closed.");
  }
});

handler.openIframe();

};



const pictures = [
  "DSC00680",
  "DSC00933",
  "DSC00966",
  "DSC00983",
  "DSC01011",
  "DSC01040",
  "DSC01064",
  "DSC01071",
  "DSC01103",
  "DSC01145",
  "DSC01420",
  "DSC01461",
  "DSC01489",
  "DSC02031",
  "DSC02064",
  "DSC02069",
];

export const pageAtom = atom(0);
export const pages = [
  {
    front: "book-cover",
    back: pictures[0],
  },
];
for (let i = 1; i < pictures.length - 1; i += 2) {
  pages.push({
    front: pictures[i % pictures.length],
    back: pictures[(i + 1) % pictures.length],
  });
}

pages.push({
  front: pictures[pictures.length - 1],
  back: "book-back",
});

export const UI = () => {
  const [copyType, setCopyType] = useState(""); // soft | hard
const [deliveryType, setDeliveryType] = useState(""); // pickup | shipping
const [shippingAddress, setShippingAddress] = useState("");
const SHIPPING_FEE = 2000;
const amount =
  copyType === "soft"
    ? 5000
    : copyType === "hard"
    ? 7000 + (deliveryType === "shipping" ? SHIPPING_FEE : 0)
    : 0;


  const [page, setPage] = useAtom(pageAtom);
  const [showEmailModal, setShowEmailModal] = useState(false);
const [customerEmail, setCustomerEmail] = useState("");
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(email);
};



  useEffect(() => {
    const audio = new Audio("/audios/page-flip-01a.mp3");
    audio.play();
  }, [page]);

   useEffect(() => {
  const script = document.createElement("script");
  script.src = "https://js.paystack.co/v1/inline.js";
  script.async = true;
  document.body.appendChild(script);
}, []);


  return (
    <>
      <main className=" pointer-events-none select-none z-10 fixed  inset-0  flex justify-between flex-col">
        <a
          className="pointer-events-auto mt-10 ml-10"
          href="https://easy-charts.vercel.app/"
        >
          <img className="w-20" src="/images/easy.png" />
        </a>
       <div className="pointer-events-auto mt-10 mr-10 absolute right-0 top-0 flex items-center gap-6">

  <a
    href="http://author.easycharts.com.ng/"
    className="
      text-white text-xl font-light hover:underline tracking-wide
      max-sm:text-base   /* smaller on mobile */
    "
  >
    About Author
  </a>

  <a
  href="#order"
  onClick={(e) => {
    e.preventDefault();
    setShowEmailModal(true);
  }}
  className="
    px-6 py-3 rounded-full border border-white text-white text-lg uppercase tracking-wide 
    hover:bg-white hover:text-black transition-all duration-300
    max-sm:px-4 max-sm:py-2 max-sm:text-sm
  "
>
  Order Now
</a>



</div>


        <div className="w-full overflow-auto pointer-events-auto flex justify-center">
          <div className="overflow-auto flex items-center gap-4 max-w-full p-10">
            {[...pages].map((_, index) => (
              <button
                key={index}
                className={`border-transparent hover:border-white transition-all duration-300  px-4 py-3 rounded-full  text-lg uppercase shrink-0 border ${
                  index === page
                    ? "bg-white/90 text-black"
                    : "bg-black/30 text-white"
                }`}
                onClick={() => setPage(index)}
              >
                {index === 0 ? "Cover" : `Page ${index}`}
              </button>
            ))}
            <button
              className={`border-transparent hover:border-white transition-all duration-300  px-4 py-3 rounded-full  text-lg uppercase shrink-0 border ${
                page === pages.length
                  ? "bg-white/90 text-black"
                  : "bg-black/30 text-white"
              }`}
              onClick={() => setPage(pages.length)}
            >
              Back Cover
            </button>
          </div>
        </div>
      </main>

      <div className="fixed inset-0 flex items-center -rotate-2 select-none"> 
  <div className="relative">
    <div className="bg-white/0 animate-horizontal-scroll flex items-center gap-8 w-max px-8">
      
      <h1 className="shrink-0 text-white text-10xl font-black ">
        The Colour Of Silence
      </h1>

      <h2 className="shrink-0 text-white text-8xl italic font-light">
        By Yekini Raji
      </h2>

      <h2 className="shrink-0 text-white text-12xl font-bold">
        Published by Easy Charts
      </h2>

      <h2 className="shrink-0 text-transparent text-12xl font-bold italic outline-text">
        The Colour Of Silence
      </h2>

      <h2 className="shrink-0 text-white text-9xl font-medium">
        Yekini Raji
      </h2>

      <h2 className="shrink-0 text-white text-9xl font-extralight italic">
        Easy Charts
      </h2>

      <h2 className="shrink-0 text-white text-13xl font-bold">
        The Colour Of Silence
      </h2>

      <h2 className="shrink-0 text-transparent text-13xl font-bold outline-text italic">
        Published by Easy Charts
      </h2>

    </div>

    <div className="absolute top-0 left-0 bg-white/0 animate-horizontal-scroll-2 flex items-center gap-8 px-8 w-max">
      
      <h1 className="shrink-0 text-white text-10xl font-black ">
        The Colour Of Silence
      </h1>

      <h2 className="shrink-0 text-white text-8xl italic font-light">
        By Yekini Raji
      </h2>

      <h2 className="shrink-0 text-white text-12xl font-bold">
        Published by Easy Charts
      </h2>

      <h2 className="shrink-0 text-transparent text-12xl font-bold italic outline-text">
        The Colour Of Silence
      </h2>

      <h2 className="shrink-0 text-white text-9xl font-medium">
        Yekini Raji
      </h2>

      <h2 className="shrink-0 text-white text-9xl font-extralight italic">
        Easy Charts
      </h2>

      <h2 className="shrink-0 text-white text-13xl font-bold">
        The Colour Of Silence
      </h2>

      <h2 className="shrink-0 text-transparent text-13xl font-bold outline-text italic">
        Published by Easy Charts  
      </h2>

    </div>
  </div>
</div>
{showEmailModal && (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[999] px-4">
    <div className="bg-white text-black rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl p-6">

      {/* HEADER */}
      <h2 className="text-xl font-semibold text-center mb-4">
        Complete Your Order
      </h2>

      {/* EMAIL */}
      <div className="mb-4">
        <label className="text-sm font-medium">Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* COPY TYPE */}
      <div className="mb-4">
        <label className="text-sm font-medium">Book format</label>
        <div className="grid grid-cols-2 gap-3 mt-2">
          <button
            onClick={() => setCopyType("soft")}
            className={`py-2 rounded-lg border text-sm ${
              copyType === "soft"
                ? "border-indigo-600 bg-indigo-50"
                : "bg-gray-100"
            }`}
          >
            Soft Copy<br />
            <span className="font-semibold">₦5,000</span>
          </button>

          <button
            onClick={() => setCopyType("hard")}
            className={`py-2 rounded-lg border text-sm ${
              copyType === "hard"
                ? "border-indigo-600 bg-indigo-50"
                : "bg-gray-100"
            }`}
          >
            Hard Copy<br />
            <span className="font-semibold">₦7,000</span>
          </button>
        </div>
      </div>

      {/* DELIVERY */}
      {copyType === "hard" && (
        <div className="mb-4">
          <label className="text-sm font-medium">Delivery</label>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <button
              onClick={() => setDeliveryType("pickup")}
              className={`py-2 rounded-lg border text-sm ${
                deliveryType === "pickup"
                  ? "border-indigo-600 bg-indigo-50"
                  : "bg-gray-100"
              }`}
            >
              Pickup
            </button>

            <button
              onClick={() => setDeliveryType("shipping")}
              className={`py-2 rounded-lg border text-sm ${
                deliveryType === "shipping"
                  ? "border-indigo-600 bg-indigo-50"
                  : "bg-gray-100"
              }`}
            >
              Ship
            </button>
          </div>

          {deliveryType === "shipping" && (
            <>
              <textarea
                placeholder="Shipping address"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                className="w-full border rounded-lg p-2 mt-3"
              />
              <p className="text-xs text-gray-500 mt-1">
                Shipping fee: ₦{SHIPPING_FEE.toLocaleString()}
              </p>
            </>
          )}
        </div>
      )}

      {/* TOTAL */}
      {amount > 0 && (
        <div className="flex justify-between text-sm font-medium border-t pt-3 mb-4">
          <span>Total</span>
          <span>₦{amount.toLocaleString()}</span>
        </div>
      )}

      {/* ACTIONS */}
      <div className="flex gap-3">
        <button
          className="flex-1 bg-gray-200 py-2 rounded-lg"
          onClick={() => {
            setCustomerEmail("");
            setShowEmailModal(false);
          }}
        >
          Cancel
        </button>

        <button
          className={`flex-1 py-2 rounded-lg text-white ${
            isValidEmail(customerEmail) &&
            copyType &&
            (copyType === "soft" ||
              (copyType === "hard" &&
                deliveryType &&
                (deliveryType === "pickup" || shippingAddress)))
              ? "bg-indigo-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={
            !isValidEmail(customerEmail) ||
            !copyType ||
            (copyType === "hard" &&
              (!deliveryType ||
                (deliveryType === "shipping" && !shippingAddress)))
          }
          onClick={() => {
            setShowEmailModal(false);
            payWithPaystack({
              email: customerEmail,
              amount,
              onSuccess: () => {
                if (copyType === "soft") downloadBook();
              },
            });
          }}
        >
          Pay ₦{amount.toLocaleString()}
        </button>
      </div>

    </div>
  </div>
)}

    </>
  );
};
