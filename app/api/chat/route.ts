import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const last = messages[messages.length - 1].content.toLowerCase();

  let reply = "Bonne question ! En regardant tes finances, je te conseille de suivre tes dépenses semaine par semaine pour mieux contrôler ton budget.";

  if (last.includes("dépense") || last.includes("plus")) {
    reply = "Tu dépenses le plus en Logement (890€), ce qui est normal. Après ça, tes Courses (180€) et ton Resto (95€) sont tes postes principaux. Le logement représente 37% de ton salaire — c'est dans la norme !";
  } else if (last.includes("économis") || last.includes("épargn")) {
    reply = "Tu épargnes déjà 320€ ce mois, bravo ! Pour aller plus loin, tu pourrais réduire le resto de 30€ et les courses de 20€. Ça te ferait 370€ d'épargne mensuelle, soit 4 440€ par an !";
  } else if (last.includes("resto") || last.includes("budget")) {
    reply = "Ton budget resto est de 95€ sur 150€ autorisés — tu es à 63%, c'est très raisonnable ! Tu peux encore dépenser 55€ ce mois sans dépasser ton budget.";
  } else if (last.includes("conseil")) {
    reply = "Mes 3 conseils pour toi : 1) Ton logement (890€/900€) est presque au max, évite les frais supplémentaires. 2) Tu épargnes bien 320€, essaie d'automatiser ce virement. 3) Tes loisirs sont très bas (45€/100€), tu peux te faire plaisir !";
  }

  return NextResponse.json({ reply });
}