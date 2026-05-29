import React from "react";

export default function Main() {
  const [meme, setMeme] = React.useState({
    topText: "One does not",
    bottomText: "Walk into Mordor",
    imageUrl: "http://i.imgflip.com/1bij.jpg",
  });

  const [allMemes, setAllMemes] = React.useState({});


  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes))
  }, []);

  

  function handleChange(e) {
    const { value, name } = e.currentTarget;

    setMeme((prevVals) => ({
      ...prevVals,
      [name]: value,
    }));

    console.log(value);
  }

  function change(){
    const randomIndex = Math.floor(Math.random() * 100);
    setMeme(prevData => ({
        ...prevData,
        imageUrl : allMemes[randomIndex].url
    }))

  }

  return (
    <main>
      <div className="form">
        <label>
          Top Text
          <input
            type="text"
            placeholder="One does not simply"
            name="topText"
            onChange={handleChange}
            value={meme.topText}
          />
        </label>

        <label>
          Bottom Text
          <input
            type="text"
            placeholder="Walk into Mordor"
            name="bottomText"
            onChange={handleChange}
            value={meme.bottomText}
          />
          X
        </label>
        <button onClick={change}>Get a new meme image 🖼</button>
      </div>
      <div className="meme">
        <img src={meme.imageUrl} />
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
      </div>
    </main>
  );
}
