import React from "react";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://fabiozanetti.it/#person",
        "name": "Fabio Zanetti",
        "jobTitle": "Studente di Ingegneria Informatica",
        "worksFor": {
          "@type": "EducationalOrganization",
          "name": "Università di Bologna",
          "alternateName": "UniBo",
          "url": "https://www.unibo.it"
        },
        "alumniOf": {
          "@type": "EducationalOrganization",
          "name": "Alma Mater Studiorum – Università di Bologna"
        },
        "url": "https://fabiozanetti.it",
        "sameAs": [
          "https://github.com/zannaStack",
          "https://linkedin.com/in/fabio-zanetti-68b8a1279"
        ],
        "knowsAbout": [
          "C (Linguaggio di Programmazione)",
          "Java (OOP)",
          "Python",
          "Algoritmi e Strutture Dati",
          "Gestione della Memoria & Puntatori",
          "Sistemi Operativi",
          "Ingegneria del Software"
        ],
        "email": "mailto:fabio06ap@gmail.com",
        "description": "Studente al 2° anno di Ingegneria Informatica presso l'Università di Bologna con solide competenze in C, Java e Python. Appassionato di sviluppo backend, logica e algoritmi."
      },
      {
        "@type": "WebSite",
        "@id": "https://fabiozanetti.it/#website",
        "url": "https://fabiozanetti.it",
        "name": "Fabio Zanetti | Ingegneria Informatica",
        "description": "Portfolio personale di Fabio Zanetti. Progetti software, algoritmi, competenze tecniche e contatti per collaborazioni part-time.",
        "publisher": {
          "@id": "https://fabiozanetti.it/#person"
        },
        "inLanguage": "it-IT"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
