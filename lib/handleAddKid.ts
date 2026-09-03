import { supabase } from "./supabase";

function generatePin() {
    return String(Math.floor(1000 + Math.random() * 9000));
}

function generateCodeInvitation() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export async function handleAddKid(nomEnfant: string, prenomEnfant: string, dateNaissance: string, email: string, tel: string, nomParent: string, avatarColor: string, urlPhoto: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { data: null, error: "User not connected"};
    }
    const pinCode = generatePin();
    const invitationCode = generateCodeInvitation();
    const { data, error } = await supabase.from("enfant").insert({
        assmat_id: user.id,
        prenom: prenomEnfant,
        nom: nomEnfant,
        date_naissance: dateNaissance,
        couleur_avatar: avatarColor,
        pin_code: pinCode,
        contact_parent_nom: nomParent,
        contact_parent_email: email,
        contact_parent_tel: tel,
        photo_url: urlPhoto,
        code_invitation: invitationCode
    }).select().single();
    if (error) {
        return { data: null, error: error.message};
    }
    return { data, error: null};
}