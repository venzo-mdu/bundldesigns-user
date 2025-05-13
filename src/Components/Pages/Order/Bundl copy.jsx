import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const initialData = [
  { id: 1, title: "Cart One", description: "Items: Apple, Banana, Mango" },
  { id: 2, title: "Cart Two", description: "Items: Milk, Bread, Butter" },
  { id: 3, title: "Cart Three", description: "Items: Rice, Dal, Oil" },
  { id: 4, title: "Cart Four", description: "Items: Eggs, Cheese, Yogurt" },
  { id: 5, title: "Cart One", description: "Items: Apple, Banana, Mango" },
  { id: 6, title: "Cart Two", description: "Items: Milk, Bread, Butter" },
  { id: 7, title: "Cart Three", description: "Items: Rice, Dal, Oil" },
  { id: 8, title: "Cart Four", description: "Items: Eggs, Cheese, Yogurt" },
];

const AnimatedCart = ({ id, title, description, onRemove }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      layout
      layoutTransition={{ duration: 0.6, ease: "easeInOut" }}
      className="border-2 border-gray-300 rounded-xl p-6 my-6 w-full max-w-md mx-auto bg-white shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      <div
        className="flex justify-between items-start"
        style={{ border: "1px solid", padding: "20px", margin: "10px" }}
      >
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
        <button
          onClick={() => onRemove(id)}
          className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    </motion.div>
  );
};

function BundlOrder({
  order,
  skipId,
  lang,
  designQuestions,
  uploadContent,
  handleChange,
  uploadFile,
  uploadIcon,
  setSkipId,
  saveContent,
}) {
  const [cartData, setCartData] = useState(initialData);

  const handleRemove = (id) => {
    setCartData((prev) => prev.filter((cart) => cart.id !== id));
  };
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.6 });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <AnimatePresence>
      <AnimatePresence>
        {cartData.map((cart) => (
          <AnimatedCart
            key={cart.id}
            id={cart.id}
            title={cart.title}
            description={cart.description}
            onRemove={handleRemove}
          />
        ))}
      </AnimatePresence>
    </AnimatePresence>
  );
}

export default BundlOrder;
