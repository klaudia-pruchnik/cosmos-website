import { useParams } from "react-router-dom";

import ArticleTitleSection from "./../components/sections/ArticleTitleSection";
import ArticleContent from "../components/sections/ArticleContent";
import Footer from "../components/layout/Footer";

const DUMMY_ARTICLES = [
  {
    id: 0,
    title: "Splątanie Kwantowe",
    image: "",
    altText: "",
    subtitle: "Jak kwanty na poważnie utkwiły w nierozłączym związku",
    author: "Admin Admin",
    date: "20.03.2023",
    content: `<h5>Czym jest splątanie kwantowe?</h5>
            <p>Splątanie kwantowe to jedna z najbardziej tajemniczych i
                fascynujących właściwości kwantów. Aby wyjaśnić, jak działa
                splątanie, pozwól, że zastosuję porównanie z codziennego życia.
            </p>
            <p>Wyobraź sobie, że masz dwie skarbonki, jedną czerwoną i jedną
                niebieską. W każdej skarbonce znajduje się kilka piłeczek, ale
                nie wiesz dokładnie ile w każdej skarbonce. Jeśli otworzysz
                czerwoną skarbonkę i zobaczysz, że jest w niej trzy piłeczki, to
                wiadomo, że w niebieskiej skarbonce musi być pozostałe piłeczki,
                czyli na przykład siedem. To logiczne i zrozumiałe.
            </p>
            <p>Teraz jednak wyobraź sobie, że te dwie skarbonki są ze sobą
                "splątane". Oznacza to, że jeśli zmienisz ilość piłeczek w
                jednej skarbonce, to zmieni się również ilość piłeczek w drugiej
                skarbonce, nawet jeśli są oddalone od siebie na dużą odległość.
                Innymi słowy, zmiana liczby piłeczek w jednej skarbonce
                natychmiast wpłynie na liczbę piłeczek w drugiej skarbonce, bez
                względu na odległość między nimi.
            </p>
            <p>To właśnie dzieje się w przypadku splątania kwantowego. Kiedy dwa
                kwanty są ze sobą splątane, to zmiana stanu jednego kwantu
                natychmiast wpłynie na stan drugiego kwantu, nawet jeśli są
                oddalone od siebie na bardzo dużą odległość. Dlatego właśnie
                splątanie jest tak fascynującą właściwością kwantów i ma
                praktyczne zastosowania w dziedzinach takich jak kryptografia
                kwantowa, gdzie wykorzystywane jest do bezpiecznego przesyłania
                informacji.
            </p>

            <h5>Życie życie jest nowelą.</h5>
            <p>Splątanie kwantowe to jedna z najbardziej tajemniczych i
                fascynujących właściwości kwantów. Aby wyjaśnić, jak działa
                splątanie, pozwól, że zastosuję porównanie z codziennego życia.
            </p>
            <p>Wyobraź sobie, że masz dwie skarbonki, jedną czerwoną i jedną
                niebieską. W każdej skarbonce znajduje się kilka piłeczek, ale
                nie wiesz dokładnie ile w każdej skarbonce. Jeśli otworzysz
                czerwoną skarbonkę i zobaczysz, że jest w niej trzy piłeczki, to
                wiadomo, że w niebieskiej skarbonce musi być pozostałe piłeczki,
                czyli na przykład siedem. To logiczne i zrozumiałe.
            </p>
            <p>Teraz jednak wyobraź sobie, że te dwie skarbonki są ze sobą
                "splątane". Oznacza to, że jeśli zmienisz ilość piłeczek w
                jednej skarbonce, to zmieni się również ilość piłeczek w drugiej
                skarbonce, nawet jeśli są oddalone od siebie na dużą odległość.
                Innymi słowy, zmiana liczby piłeczek w jednej skarbonce
                natychmiast wpłynie na liczbę piłeczek w drugiej skarbonce, bez
                względu na odległość między nimi.
            </p>
            <p>To właśnie dzieje się w przypadku splątania kwantowego. Kiedy dwa
                kwanty są ze sobą splątane, to zmiana stanu jednego kwantu
                natychmiast wpłynie na stan drugiego kwantu, nawet jeśli są
                oddalone od siebie na bardzo dużą odległość. Dlatego właśnie
                splątanie jest tak fascynującą właściwością kwantów i ma
                praktyczne zastosowania w dziedzinach takich jak kryptografia
                kwantowa, gdzie wykorzystywane jest do bezpiecznego przesyłania
                informacji.
            </p>`,
  },
];

export default function Article() {
  const params = useParams();
  const currentArticle = DUMMY_ARTICLES.find(
    (article) => article.id == params.articleId
  );

  return (
    <>
      <ArticleTitleSection
        title={currentArticle.title}
        subtitle={currentArticle.subtitle}
        image={currentArticle.image}
        altText={currentArticle.altText}
        author={currentArticle.author}
        date={currentArticle.date}
      />
      <ArticleContent content={currentArticle.content} />
    </>
  );
}
