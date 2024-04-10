import React from 'react';
import Button from '../Button/Button';

function Articles() {
  const text = 'Voir tous nos ';
  const largerText = 'articles';
  return (
    <section className="bg-black-light w-11/12 m-auto text-white">
      <div className="flex justify-between items-center p-20">
        <p className="w-2/4 text-4xl ">
          <span>Lorem</span>

          <span className=" font-semibold">
            {'  '}
            ipsum dolor
            {'  '}
          </span>

          <span>sit amet.</span>
        </p>
        <Button className="w-full max-w-[336px] bg-purple px-8 py-4 rounded-full flex flex-col items-center hover:shadow-lg hover:scale-105 transition-transform ease-in text-black" text={text} largerText={largerText} />
      </div>
      <p className="text-white"> Test pour le composant article</p>
    </section>
  );
}

export default Articles;
