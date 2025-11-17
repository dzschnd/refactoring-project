export const getInvitationDetailsQuery = async (invitationId, isPublished, client) => {
    const result = await client.query(`
        SELECT
            i.id,
            i.partner_1_name,
            i.partner_2_name,
            i.couple_image,
            i.author_id,
            i.template_id,
            TO_CHAR(i.event_date, 'YYYY-MM-DD') AS event_date,
            i.is_published,
            t.name AS template_name,
            COALESCE(jsonb_build_object('address', p.address, 'place_image', p.place_image, 'link', p.link), '{}'::jsonb) AS place,
            COALESCE(json_agg(DISTINCT jsonb_build_object('color_code', c.color_code, 'position', ic.position)) FILTER (WHERE ic.invitation_id IS NOT NULL), '[]') AS colors,
            COALESCE(json_agg(DISTINCT jsonb_build_object('event_time', pi.event_time, 'description', pi.description, 'position', pi.position)) FILTER (WHERE pi.invitation_id IS NOT NULL), '[]') AS plan_items,
            COALESCE(json_agg(DISTINCT jsonb_build_object('wish', w.wish, 'position', w.position)) FILTER (WHERE w.invitation_id IS NOT NULL), '[]') AS wishes,
            COALESCE(json_agg(DISTINCT jsonb_build_object('id', fq.id, 'question', fq.question, 'position', fq.position, 'type', fq.type)) FILTER (WHERE fq.invitation_id IS NOT NULL), '[]') AS questions,
            COALESCE(json_agg(DISTINCT jsonb_build_object('answer', fa.answer, 'position', fa.position, 'question_position', fq.position)) FILTER (WHERE fa.invitation_id IS NOT NULL), '[]') AS answers
        FROM
            invitations i
                JOIN
            templates t ON i.template_id = t.id
                LEFT JOIN
            places p ON i.place_id = p.id
                LEFT JOIN
            invitation_colors ic ON ic.invitation_id = i.id
                LEFT JOIN
            colors c ON ic.color_id = c.id
                LEFT JOIN
            plan_items pi ON pi.invitation_id = i.id
                LEFT JOIN
            wishes w ON w.invitation_id = i.id
                LEFT JOIN
            form_questions fq ON fq.invitation_id = i.id
                LEFT JOIN
            form_answers fa ON fa.question_id = fq.id AND fa.invitation_id = i.id
        WHERE
            i.id = $1
          AND
            i.is_published = $2
        GROUP BY
            i.id, t.name, p.address, p.place_image, p.link;
        `, [invitationId, isPublished]
    );
    return result.rows;
};
export const getInvitationQuery = async (invitationId, client) => {
    const result = await client.query(`
        SELECT * FROM invitations WHERE id = $1 AND is_published = $2`,
        [invitationId, true]
    );
    return result.rows;
};
export const getDraftQuery = async (invitationId, authorId, client) => {
    const result = await client.query(`
        SELECT * FROM invitations WHERE id = $1 AND author_id = $2 AND is_published = $3`,
        [invitationId, authorId, false]
    );
    return result.rows;
};

export const getAllInvitationsQuery = async (authorId, isPublished, client) => {
    const result = await client.query(`
        SELECT * FROM invitations WHERE author_id = $1 AND is_published = $2 ORDER BY created_at DESC`,
        [authorId, isPublished]
    );
    return result.rows;
};

export const getTemplateIdQuery = async (templateName, client) => {
    const result = await client.query(`
            SELECT id FROM templates WHERE name = $1`,
        [templateName]
    );
    return result.rows;
}

export const getInvitationPlaceIdQuery = async (invitationId, client) => {
    const result = await client.query(`
            SELECT place_id FROM invitations WHERE id = $1`,
        [invitationId]
    );
    return result.rows;
}

export const getColorIdQuery = async (colorCode, client) => {
    const result = await client.query(`
            SELECT id FROM colors WHERE color_code = $1`,
        [colorCode]
    );
    return result.rows;
}
export const getFormQuestionByPositionQuery = async (invitationId, position, client) => {
    const result = await client.query(`
            SELECT id FROM form_questions WHERE form_questions.invitation_id = $1 AND position = $2`,
        [invitationId, position]
    );
    return result.rows;
}
export const getAllFormQuestionsQuery = async (invitationId, client) => {
    const result = await client.query(`
            SELECT * FROM form_questions WHERE form_questions.invitation_id = $1`,
        [invitationId]
    );
    return result.rows;
}
export const getAllFormAnswersQuery = async (invitationId, client) => {
    const result = await client.query(`
            SELECT * FROM form_answers WHERE form_answers.invitation_id = $1`,
        [invitationId]
    );
    return result.rows;
}
export const getAllGuestAnswersQuery = async (authorId, client) => {
    const result = await client.query(`
                SELECT guest_answers.* FROM guest_answers
                JOIN invitations ON guest_answers.invitation_id = invitations.id
                WHERE invitations.author_id = $1`,
        [authorId]
    );
    return result.rows;
}





export const createDraftQuery = async (authorId, templateId, client) => {
    const result = await client.query(`
            INSERT INTO invitations (author_id, template_id) VALUES ($1, $2) RETURNING *`,
        [authorId, templateId]
    );
    return result.rows;
}
export const createPlaceQuery = async (address, placeImage, link, client) => {
    const result = await client.query(`
            INSERT INTO places (address, place_image, link) VALUES ($1, $2, $3) RETURNING *`,
        [address, placeImage, link]
    );
    return result.rows;
}
export const createInvitationColorQuery = async (invitationId, colorId, position, client) => {
    const result = await client.query(`
            INSERT INTO invitation_colors (invitation_id, color_id, position) VALUES ($1, $2, $3)`,
        [invitationId, colorId, position]
    );
    return result.rows;
}
export const createColorQuery = async (colorCode, client) => {
    const result = await client.query(`
            INSERT INTO colors (color_code) VALUES ($1) RETURNING id`,
        [colorCode]
    );
    return result.rows;
}
export const createPlanItemQuery = async (eventTime, description, position, invitationId, client) => {
    const result = await client.query(`
            INSERT INTO plan_items (event_time, description, position, invitation_id) VALUES ($1, $2, $3, $4)`,
        [eventTime, description, position, invitationId]
    );
    return result.rows;
}
export const createWishQuery = async (wish, position, invitationId, client) => {
    console.log(wish + " " + position)
    const result = await client.query(`
            INSERT INTO wishes (wish, position, invitation_id) VALUES ($1, $2, $3)`,
        [wish, position, invitationId]
    );
    return result.rows;
}
export const createFormQuestionQuery = async (question, type, position, invitationId, client) => {
    const result1 = await client.query(`
                SELECT * FROM form_questions WHERE invitation_id = $1`,
        [invitationId]
    );
    console.log("EXISTING", result1.rows);
    const result = await client.query(`
            INSERT INTO form_questions (question, type, position, invitation_id) VALUES ($1, $2, $3, $4) RETURNING id`,
        [question, type, position, invitationId]
    );
    console.log("NOW", result.rows);
    return result.rows;
}
export const createFormAnswerQuery = async (answer, questionId, position, invitationId, client) => {
    const result = await client.query(`
            INSERT INTO form_answers (answer, question_id, position, invitation_id) VALUES ($1, $2, $3, $4)`,
        [answer, questionId, position, invitationId]
    );
    return result.rows;
}
export const createGuestAnswerQuery = async (invitationId, questionId, guestName, isComing, answer, guestId, client) => {
    const result = await client.query(`
            INSERT INTO guest_answers (invitation_id, question_id, guest_name, is_coming, answer, guest_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
        [invitationId, questionId, guestName, isComing, answer, guestId]
    );
    return result.rows;
}




export const publishInvitationQuery = async (invitationId, authorId, client) => {
    const result = await client.query(`
        UPDATE invitations SET is_published = true WHERE id = $1 AND author_id = $2 AND is_published = false`,
        [invitationId, authorId]
    );
    return result.rows;
}
export const updatePlaceQuery = async (address, placeImage, link, placeId, client) => {
    const result =  await client.query(`
            UPDATE places SET address = $1, place_image = $2, link = $3 WHERE id = $4`,
            [address, placeImage, link, placeId]
    );
    return result.rows;
}
export const updateInvitationPlaceIdQuery = async (placeId, invitationId, client) => {
    const result = await client.query(`
            UPDATE invitations SET place_id = $1
            WHERE id = $2`,
            [placeId, invitationId]
    );
    return result.rows;
}
export const updateInvitationsQuery = async (setClause, values, client) => {
    const result = await client.query(`
            UPDATE invitations ${setClause} WHERE 
            id = $${values.length} RETURNING *`,
            values
    );
    return result.rows;
}




export const deleteInvitation = async (invitationId, authorId, client) => {
    const result = await client.query(`
            DELETE FROM invitations WHERE id = $1 AND author_id = $2 AND is_published = false`,
            [invitationId, authorId]
    );
    return result.rowCount;
}
export const deleteInvitationColorsQuery = async (invitationId, client) => {
    const result = await client.query(`
        DELETE FROM invitation_colors WHERE invitation_id = $1`,
        [invitationId]
    );
    return result.rowCount;
}
export const deletePlanItemsQuery = async (invitationId, client) => {
    const result = await client.query(`
            DELETE FROM plan_items WHERE invitation_id = $1`,
            [invitationId]
    );
    return result.rowCount;
}
export const deleteWishesQuery = async (invitationId, client) => {
    const result = await client.query(`
            DELETE FROM wishes WHERE invitation_id = $1`,
            [invitationId]
    );
    return result.rowCount;
}
export const deleteFormQuestionsQuery = async (invitationId, client) => {
    const result = await client.query(`
            DELETE FROM form_questions WHERE invitation_id = $1`,
            [invitationId]
    );
    return result.rowCount;
}
export const deleteFormAnswersQuery = async (invitationId, client) => {
    const result = await client.query(`
            DELETE FROM form_answers WHERE invitation_id = $1`,
            [invitationId]
    );
    return result.rowCount;
}
export const deleteGuestAnswersQuery = async (invitationId, guestId, client) => {
    const result = await client.query(`
            DELETE FROM guest_answers WHERE invitation_id = $1 AND guest_id = $2`,
            [invitationId, guestId]
    );
    return result.rowCount;
}
