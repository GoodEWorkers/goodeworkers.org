import React from 'react';
import BigRoundedLinkBtn from '../Common/BigRoundedLinkBtn';
import ArticleImg from '../../assets/icons/ArticleImg.svg';

function Articles() {
  const text = 'Voir tous nos ';
  const largerText = 'articles';

  const ArticleCards = [
    {
      icon: <ArticleImg />,
      title: 'Titre lorem ipsum dolor si amet consectetur adipiscing elit',
      writer: 'Jean Michel Lipsum',
      readingTime: '8min',
      tag: ['tech', 'design'],
    },
    {
      icon: <ArticleImg />,
      title: 'Titre lorem ipsum',
      writer: 'Jean Michel Lipsum',
      readingTime: '8min',
      tag: ['tech', 'design', 'design', 'loremipsum'],
    },
    {
      icon: <ArticleImg />,
      title: 'Titre lorem ipsum dolor si amet consectetur',
      writer: 'Jean Michel Lipsum',
      readingTime: '8min',
      tag: ['tech', 'design'],
    },
  ];
  return (
    <section className="bg-black-light text-white  relative -mt-12 mb-12 px-8 pt-12 lg:pt-32 pb-6 md:pb-16 lg:pb-28 rounded-xl sm:rounded-2xl lg:rounded-3xl lg:justify-between">
      <div className="flex justify-between items-center px-10 pb-16">
        <p className="w-2/4 text-4xl ">
          <span>Lorem</span>

          <span className=" font-semibold">
            {'  '}
            ipsum dolor
            {'  '}
          </span>

          <span>sit amet.</span>
        </p>
        <BigRoundedLinkBtn
          upperSmallText={text}
          bigBtmText={largerText}
          className="bg-purple text-black"
          href="/article"
        />
      </div>

      <div className="flex w-10/12 m-auto max-xl:flex-col max-xl:items-center max-xl:w-1/2 ">
        {ArticleCards.map((article) => (
          <div key={article.title} className="w-3/5 my-4 max-xl:w-full">
            <div>{article.icon}</div>
            <h2 className="font-clash font-semibold text-xl py-5 w-4/6 max-lg:w-full">
              {article.title}
            </h2>
            <section className="flex justify-between w-4/6 pb-8 max-lg:w-full">
              <div>
                <p className="text-purple">writer</p>
                <p>{article.writer}</p>
              </div>
              <div className="">
                <p className="text-purple">reading time</p>
                <p>{article.readingTime}</p>
              </div>
            </section>
            <div className="flex  w-5/6">
              {article.tag.map((element) => (
                <p key={element} className=" rounded-2xl z-0 border-white border md:border-1 mr-2 px-2">
                  {element}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Articles;
