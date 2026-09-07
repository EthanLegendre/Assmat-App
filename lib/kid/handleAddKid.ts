import { supabase } from "@/lib/supabase";

function generatePin() {
    return String(Math.floor(1000 + Math.random() * 9000));
}

function generateCodeInvitation() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export async function handleAddKid(nomEnfant: string,
                                    prenomEnfant: string,
                                    dateNaissance: string,
                                    email: string,
                                    tel: string,
                                    nomParent: string,
                                    prenomParent: string,
                                    tauxHoraire: string,
                                    indemniteJournaliere: string,
                                    avatarColor: string,
                                    urlPhoto: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { data: null, error: "User not connected"};
    }
    const invitationCode = generateCodeInvitation();
    const { data, error } = await supabase.from("enfant").insert({
        assmat_id: user.id,
        nom: nomEnfant,
        prenom: prenomEnfant,
        date_naissance: dateNaissance,
        couleur_avatar: avatarColor,
        photo_url: urlPhoto,
        contact_parent_nom: nomParent,
        contact_parent_prenom: prenomParent,
        contact_parent_email: email,
        contact_parent_telephone: tel,
        code_invitation: invitationCode,
        rémunération_taux_horaire: parseFloat(tauxHoraire),
        indemnité_journalière: parseFloat(indemniteJournaliere),
    }).select().single();
    if (error) {
        return { data: null, error: error.message};
    }
    return { data, error: null};
}