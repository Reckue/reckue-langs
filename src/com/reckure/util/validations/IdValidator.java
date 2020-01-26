package com.reckure.util.validations;

import java.util.UUID;

public class IdValidator {

    /**
     * This method used for verification that we have some id
     * If have no id, calls method buildId, and generate it
     *
     * @param id - received from json
     * @param userId - using in buildId as unique key
     * @return 100% valid id
     */
    public static String validateId(String id, String userId) {
        if(id == null) {
            return buildId(userId);
        }
        return id;
    }

    /**
     * This method used if id validation failed (id == null)
     * Method building new UUID and convert it into string without "-" chars
     *
     * @param userId - key for generation unique UUID
     * @return unique string [example: 123e4567e89b12d3a456426655440000]
     */
    public static String buildId(String userId) {
        byte[] keyBytes = userId.getBytes();
        UUID generatedUUID = UUID.nameUUIDFromBytes(keyBytes);
        return generatedUUID.toString().replaceAll("-", "");
    }
}
