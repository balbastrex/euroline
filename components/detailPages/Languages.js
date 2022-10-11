import React, { useState, Fragment } from "react";

export const Languages = (designSelected) => {
  const [language, setLanguage] = useState({});
  const { languages } = designSelected;

  const handleLanguage = (languageSelect) => {
    if (languageSelect) {
      languages.map(
        (lang) => lang.id === Number(languageSelect) && setLanguage(lang)
      );
    }
  };

  return (
    <div>
      {languages.length > 0 && (
        <Fragment>
          <label htmlFor="fieldOfResearch">Idiomas</label>
          <select
            value={language.value}
            onChange={(e) => handleLanguage(e.target.value)}
          >
            <option value="">-- Elija Idioma --</option>
            {languages.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.name}: {lang.text}
              </option>
            ))}
          </select>
        </Fragment>
      )}
    </div>
  );
};
